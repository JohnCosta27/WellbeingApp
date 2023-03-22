import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
  HowAmIWords,
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
    async howAmIWords(): Promise<Array<HowAmIWords>> {
      const words = await prisma.howAmIWords.findMany();

      return words.map((w) => ({
        id: w.id,
        word: w.word,
      }));
    },
    async currentUser(_parent, _args, context): Promise<User> {
      const userWords = await prisma.userHowAmIWords.findMany({
        where: {
          user_id: context.uuid,
        },
        include: {
          word: true
        }
      });

      const energy = await getUserMentalEnergy(context.uuid);

      userWords.forEach(w => console.log(w));

      const user: User = {
        brand: {
          words: [],
        },
        mentalEnergy: energy,
        howAmIWords: userWords.map((w) => ({
          id: w.word.id,
          word: w.word.word,
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
    async addHowAmIWord(_parent, { id }, context): Promise<boolean> {
      try {
        await prisma.userHowAmIWords.create({
          data: {
            how_am_i_word_id: id,
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
