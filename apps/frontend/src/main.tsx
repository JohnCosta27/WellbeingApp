import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { router } from "./Router";

import "./index.css";

const httpLink = createHttpLink({
  uri: `${window.location.protocol}//${
    import.meta.env.VITE_BACKEND_URL
  }/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access");
  return {
    headers: {
      ...headers,
      authorization: token ?? "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
