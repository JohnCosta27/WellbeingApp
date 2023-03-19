import fs from "fs";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { MentalEnergy } from "@wellbeing/graphql-types";
import express from "express";

// @ts-ignore
import cors from "cors";

const file = fs.readFileSync(path.join(__dirname, "../../../packages/graphql/schema.graphql"), "utf8");

const resolvers = {
  Query: {
    async MentalEnergy(): Promise<MentalEnergy> {
      return {
        date: 50,
        level: 123,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: `#graphql
    ${file}
`,
  resolvers,
});

const app = express();
app.use(cors());

(async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(3030, () => {
    console.log("Server running");
  });
})();
