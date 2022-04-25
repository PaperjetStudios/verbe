import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

import axios, { AxiosInstance } from "axios";

export const setup = {
  title: "Verbe",
  description: "Ecommerce Store",
};

export const dev_api = {
  userStateName: "verbe_dev_user",
  cartStateName: "verbe_dev_cart",
  graphqlApi: "http://localhost:1337",
  url: "http://localhost:1337",
};

export const api = {
  userStateName: "verbe_user",
  cartStateName: "verb_cart",
  graphqlApi: "https://admin.verbe.co.za",
  url: "https://admin.verbe.co.za",
};

export const DefaultPageSize = 2;

export const currentApi = api; //process.env.NODE_ENV === "production" ? api : dev_api;

const httpLink = createUploadLink({
  uri: `${currentApi.graphqlApi}/graphql`,
});

const authedLink = (jwt: undefined | string) => {
  return setContext(async (_, context) => {
    const Headers = {
      headers: {
        ...context.headers,
        Authorization: typeof jwt === "string" ? `Bearer ${jwt}` : "",
      },
    };

    return Headers;
  });
};

export const axiosInstance = (extraHeaders = null): AxiosInstance => {
  return axios.create({
    baseURL: currentApi.url,
    timeout: 10000,
    headers: extraHeaders ? extraHeaders : {},
  });
};

export function createStrapiAxios(jwt: string) {
  return axios.create({
    baseURL: currentApi.url,
    headers: jwt && {
      Authorization: `Bearer ${jwt}`,
    },
  });
}

const client = (jwt: null | undefined | string) => {
  return new ApolloClient({
    connectToDevTools: true,
    link: authedLink(jwt).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default client;
