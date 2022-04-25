import { useEffect, useRef, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "react-query";

import { Provider } from "jotai";
import ApolloProviderContext from "../config/graphql/ApolloProviderContext";

import nProgress from "nprogress";
import { Router } from "next/router";
import "../styles/nprogress.scss";
import "../styles/slick.scss";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { theme } from "../theme/chakra-theme";
import FullScreenLoader from "../components/Common/FullScreenLoader/FullScreenLoader";
import cs from "../config/cs";

function MyApp({ Component, pageProps }) {
  const queryClient = useRef(new QueryClient());

  const [overallLoading, setOverallLoading] = useState(true);

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
    if (overallLoading === true) {
      setTimeout(() => {
        setOverallLoading(false);
      }, 5000);
    }
  }, [overallLoading]);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <QueryClientProvider client={queryClient.current}>
      <Provider>
        <ApolloProviderContext>
          <ChakraProvider theme={theme}>
            <FullScreenLoader status={overallLoading} />
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </ApolloProviderContext>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
