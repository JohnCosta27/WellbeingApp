import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  HowAmIPhrase,
  MentalEnergy,
  Resolvers,
  User,
} from "@wellbeing/graphql-types";
import express from "express";

import cors from "cors";
import { json } from "body-parser";

import AuthRouter from "./auth";
import { verifyJwt } from "./util/jwt";
import { GraphQLError } from "graphql";
import { prisma } from "./prisma";

const file = fs.readFileSync(
  path.join(__dirname, "../../../packages/graphql/schema.graphql"),
  "utf8"
);

interface Context {
  uuid: string;
}

async function getUserMentalEnergy(uuid: string): Promise<Array<MentalEnergy>> {
  const newEnergy = await prisma.mentalEnergy.findMany({
    where: {
      user_id: uuid,
    },
  });

  const value: Array<MentalEnergy> = newEnergy.map((i) => ({
    level: i.level,
    date: Math.floor(new Date(i.date).getTime()),
  }));

  return value;
}

const resolvers: Resolvers<Context> = {
  Query: {
    async mentalEnergy(_parent, _args, context): Promise<Array<MentalEnergy>> {
      return await getUserMentalEnergy(context.uuid);
    },

    async howAmIPhrase(): Promise<Array<HowAmIPhrase>> {
      const phrases = await prisma.howAmIPhrase.findMany();

      return phrases.map((w) => ({
        id: w.id,
        phrase: w.phrase,
      }));
    },

    async currentUser(_parent, _args, context): Promise<User> {
      const userPhrases = await prisma.userHowAmIPhrase.findMany({
        where: {
          user_id: context.uuid,
        },
        include: {
          phrase: true,
        },
      });

      const energy = await getUserMentalEnergy(context.uuid);

      const user: User = {
        brand: {
          words: [],
        },
        mentalEnergy: energy,
        howAmIPhrase: userPhrases.map((w) => ({
          phrase: w.phrase,
          date: new Date(w.date_added).getTime(),
        })),
      };

      return user;
    },
  },

  Mutation: {
    async addMentalEnergy(_parent, { level }, context): Promise<MentalEnergy> {
      if (level < 0 || level > 1) {
        throw GetBadValueError();
      }

      const mentalEnergy = await prisma.mentalEnergy.create({
        data: {
          level,
          user_id: context.uuid,
        },
      });

      return {
        level: mentalEnergy.level,
        date: Math.floor(new Date(mentalEnergy.date).getTime()),
      };
    },

    async addHowAmIPhrase(_parent, { id }, context): Promise<boolean> {
      try {
        await prisma.userHowAmIPhrase.create({
          data: {
            how_am_i_phrase_id: id,
            user_id: context.uuid,
          },
        });

        return true;
      } catch (err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
    },
  },
};

const server = new ApolloServer<Context>({
  typeDefs: `#graphql
    ${file}
`,
  resolvers,
});

const app = express();

app.use(json());
app.use(cors());

app.use((_, res, next) => {
  res.contentType("application/json");
  next();
});

app.use("/auth", AuthRouter);

(async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: async ({ req }) => {
        if (!req.headers.authorization) {
          throw GetAuthorizedError();
        }
        const token = verifyJwt(req.headers.authorization);

        const timeNow = new Date().getTime() / 1000;
        if (!token || token.exp < timeNow) {
          throw GetAuthorizedError();
        }

        return {
          uuid: token.uuid,
        };
      },
    })
  );
  app.listen(3030, () => {
    console.log("Server running");
  });
})();

function GetAuthorizedError(): GraphQLError {
  return new GraphQLError("User is authorizated", {
    extensions: {
      code: "UNAUTHORIZED",
      http: {
        status: 401,
      },
    },
  });
}

function GetBadValueError(): GraphQLError {
  return new GraphQLError("Value is wrong", {
    extensions: {
      code: "INVALID",
      http: {
        status: 400,
      },
    },
  });
}
