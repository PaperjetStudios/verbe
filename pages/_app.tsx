import { useEffect, useRef, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import { Provider, useAtom } from "jotai";
import ApolloProviderContext from "../config/graphql/ApolloProviderContext";

import NextNProgress from "nextjs-progressbar";

import { Router } from "next/router";

import "../styles/slick.scss";

import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { theme } from "../theme/chakra-theme";
import FullScreenLoader from "../components/Common/FullScreenLoader/FullScreenLoader";

import ResetState from "../components/Common/ResetState";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const [overallLoading, setOverallLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setOverallLoading(true);
  });
  Router.events.on("routeChangeError", () => {
    setOverallLoading(false);
  });
  Router.events.on("routeChangeComplete", () => {
    setOverallLoading(false);
  });

  useEffect(() => {
    setOverallLoading(false);
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehyratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider>
          <ResetState />
          <ApolloProviderContext>
            <ChakraProvider theme={theme}>
              <NextNProgress />
              <FullScreenLoader status={overallLoading} />
              {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
          </ApolloProviderContext>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
