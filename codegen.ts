import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./packages/graphql/schema.graphql",
  documents: ["./packages/graphql/queries.graphql", "./packages/graphql/mutations.graphql"],
  generates: {
    "./packages/graphql/src/__generated__/resolvers-types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-react-apollo",
        "named-operations-object"
      ],
      config: {
        withHooks: true,
        hooksImportFrom: "@apollo/react-hooks",
      },
    },
  },
};

export default config;
