import { ApolloProvider } from "@apollo/client";

import client from "../api";
import useUser from "../../hooks/useUser";

export default function ApolloProviderContext({ children }) {
  const { user } = useUser();

  return <ApolloProvider client={client(user?.jwt)}>{children}</ApolloProvider>;
}
