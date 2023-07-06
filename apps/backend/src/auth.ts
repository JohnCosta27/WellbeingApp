import { Auth } from "@wellbeing/graphql-types";
import express, { Request, Response } from "express";
import { sha512 } from "js-sha512";
import { prisma } from "./prisma";
import { generateJwt, verifyJwt } from "./util/jwt";
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

    // Each new user will have an empty initial brand.
    await prisma.brand.create({
      data: {
        user_id: createNewUser.id,
        name: "First Brand",
      },
    });

    const returnData: Auth.Response = {
      type: "success",
      body: {
        refresh: generateJwt(createNewUser.id, "refresh"),
        access: generateJwt(createNewUser.id, "access"),
      },
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

    const returnData: Auth.Response = {
      type: "success",
      body: {
        refresh: generateJwt(foundUser.id, "refresh"),
        access: generateJwt(foundUser.id, "access"),
      },
    };

    res.status(200).send(returnData);
    return;
  } catch (error) {
    console.error("Error with loggin user in: " + error);
    res.status(403).send({ error: "Credential error" });
    return;
  }
});

AuthRouter.post("/refresh", async (req: Request, res: Response) => {
  const refreshToken = verifyJwt(req.body.refresh);
  if (!refreshToken) {
    res.status(400).send({ error: "Invalid JWT" });
    return;
  }

  const dateNow = new Date().getTime() / 1000;
  if (refreshToken.exp < dateNow) {
    res.status(403).send({ error: "Invalid JWT" });
    return;
  }
  const foundUser = await prisma.users.findUnique({
    where: {
      id: refreshToken.uuid,
    },
  });

  if (!foundUser) {
    res.status(403).send({ error: "Invalid JWT" });
    return;
  }

  const response: Auth.RefreshResponse = {
    type: "success",
    body: {
      access: generateJwt(foundUser.id, "access"),
    },
  };

  res.status(200).send(response);
});

export default AuthRouter;
