import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {
    BrandWords,
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

function timestamp(date: Date): number {
  return Math.floor(new Date(date).getTime())
}

const resolvers: Resolvers<Context> = {
  Query: {
    async howAmIPhrase(): Promise<Array<HowAmIPhrase>> {
      const phrases = await prisma.howAmIPhrase.findMany();

      return phrases.map((w) => ({
        id: w.id,
        phrase: w.phrase,
      }));
    },

    async brandWords(): Promise<Array<BrandWords>> {
      return await prisma.brandWords.findMany();
    },

    async currentUser(_parent, _args, context): Promise<User> {
      const user = await prisma.users.findUnique({
        where: {
          id: context.uuid,
        },
        include: {
          mental_energy: true,
          how_am_i_phrases: {
            include: {
              phrase: true,
            }
          },
          brand_words: {
            include: {
              brand_word: true,
            }
          }
        }
      });

      if (!user) {
        throw new Error("Context user not found");
      }

      const returnUser: User = {
        brand: {
          words: user.brand_words.map(w => ({
            id: w.brand_word_id,
            word: w.brand_word.word,
          })),
        },
        mentalEnergy: user.mental_energy.map(m => ({
          date: timestamp(m.date),
          level: m.level,
        })),
        howAmIPhrase: user.how_am_i_phrases.map((w) => ({
          date: timestamp(w.date_added),
          phrase: w.phrase,
        })),
      };

      return returnUser;
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

    async addBrandWord(_parent, { wordId }, context): Promise<boolean> {
      try {
        await prisma.userBrandWords.create({
          data: {
            brand_word_id: wordId,
            user_id: context.uuid,
          }
        })
      } catch(err) {
        console.log(err);
        throw new Error("Database error, most likely ID not found");
      }
      return true;
    }
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
