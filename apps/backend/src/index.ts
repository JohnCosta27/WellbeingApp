import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { MentalEnergy, Resolvers } from "@wellbeing/graphql-types";
import express from "express";

// @ts-ignore
import cors from "cors";

// @ts-ignore
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

const resolvers: Resolvers<Context> = {
  Query: {
    async MentalEnergy(_parent, _args, context): Promise<Array<MentalEnergy>> {
      const mentalEnergy = await prisma.mentalEnergy.findMany({
        where: {
          user_id: context.uuid,
        }
      });

      const value: Array<MentalEnergy> = mentalEnergy.map(i => ({
        level: i.level,
        date: Math.floor(new Date(i.date).getTime() / 1000),
      }))

      return value;
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
        }
      });

      return {
        level: mentalEnergy.level,
        date: Math.floor(new Date(mentalEnergy.date).getTime() / 1000),
      };
    }
  }
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
  return new GraphQLError('User is authorizated', {
    extensions: {
      code: 'UNAUTHORIZED',
      http: {
        status: 401,
      }
    }
  });
}

function GetBadValueError(): GraphQLError {
  return new GraphQLError('Value is wrong', {
    extensions: {
      code: 'INVALID',
      http: {
        status: 400,
      }
    }
  });
}
