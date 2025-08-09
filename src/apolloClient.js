import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_SUBGRAPH_URL,
  }),
  cache: new InMemoryCache(),
});

export default client;
