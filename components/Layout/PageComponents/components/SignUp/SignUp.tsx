import React from "react";
import styles from "./styles.module.scss";

import { Box, Text } from "@chakra-ui/react";

import { createImageLink } from "../../../../../config/util";

import { SignUpProps } from "../../../../../data/layout/signup";
import NewsletterSignup from "../../../../Widgets/NewsletterSignup/NewsletterSignup";
import ReactMarkdown from "react-markdown";

type Props = {
  layout: SignUpProps;
};

const SignUp: React.FC<Props> = ({ layout }) => {
  const { Background, Title } = layout;

  return (
    <Box
      mt={5}
      className={styles.container}
      style={{
        backgroundImage: `url(${createImageLink(
          Background.data?.attributes.url
        )})`,
      }}
    >
      <Box className={styles.inner}>
        <Box className={styles.info}>
          <ReactMarkdown>{Title}</ReactMarkdown>
          <NewsletterSignup />
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
