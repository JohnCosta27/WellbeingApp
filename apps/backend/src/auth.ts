import express, { Request, Response } from "express";
import { sha512 } from "js-sha512";
import { prisma } from "./prisma";
import { generateJwt } from "./util/jwt";
import randomstring from "./util/randomstring";

const AuthRouter = express.Router();
const PASSWORD_SALT_LENGTH = 128;

AuthRouter.post("/register", async (req: Request, res: Response) => {
  const passwordSalt = randomstring(PASSWORD_SALT_LENGTH);
  const passwordHash = sha512(req.body.password + passwordSalt);

  try {
    const createNewUser = await prisma.users.create({
      data: {
        email: req.body.email,
        password: passwordHash,
        password_salt: passwordSalt,
      },
    });

    const returnData = {
      refresh: generateJwt(createNewUser.id, "refresh"),
      access: generateJwt(createNewUser.id, "access"),
    };

    res.status(200).send(returnData);
    return;
  } catch (error) {
    console.error("Error with registering a new user: " + error);
    res.status(400).send({ error: "User already exists" });
    return;
  }
});

AuthRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const foundUser = await prisma.users.findFirst({
      where: {
        email: {
          equals: req.body.email,
          mode: "insensitive",
        },
      },
    });

    if (!foundUser) {
      res.status(403).send({ error: "Credential error" });
      return;
    }

    const passwordHash = sha512(req.body.password + foundUser.password_salt);
    if (passwordHash !== foundUser.password) {
      res.status(403).send({ error: "Credential error" });
      return;
    }

    const returnData = {
      refresh: generateJwt(foundUser.id, "refresh"),
      access: generateJwt(foundUser.id, "access"),
    };

    res.status(200).send(returnData);
    return;
  } catch (error) {
    console.error("Error with loggin user in: " + error);
    res.status(403).send({ error: "Credential error" });
    return;
  }
});

/*
authRouter.post(
  '/refresh',
  async (req: Request, res: Response) => {
    try {
      const refreshToken = verifyJwt(req.body.refresh);
      if (!refreshToken) {
        res.status(400).send("Invalid JWT");
        return;
      }

        if (refreshToken.token) {
          const refreshTokenObject: token = refreshToken.token;
          // TODO: modify this for the new expirary date
          if (refreshTokenObject.exp < (new Date().getTime() / 1000)) {
            res.status(400).send(getExpiredJwtMessage("refresh"));
            return;
          } else {
            const foundUser: users | null = await prisma.users.findUnique({
              where: {
                id: refreshTokenObject.uuid,
              },
            });

            if (foundUser == null) {
              res.status(403).send(getInvalidUserError());
            } else {
              res.status(200).send({
                access: generateJwt(foundUser, "ACCESS"),
              });
            }
          }
      }
    } catch (error) {
      console.error("Access Token Refresh Error: "+error);
      res.status(400).send({ error: "Access token refresh error" });
      return;
    }
  }
);
*/

export default AuthRouter;
