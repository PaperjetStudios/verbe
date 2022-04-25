import React from "react";
import styles from "./widgets.module.scss";
import { useQuery } from "react-query";

import { Box, Flex, Text } from "@chakra-ui/react";
import { FooterWidgetProps } from "../../../data/settings/main-menu";
import { getOptionData, OptionDataType } from "../../../data/settings/options";
import NewsletterSignup from "../../Widgets/NewsletterSignup/NewsletterSignup";
import SocialListing from "../../Widgets/SocialListing/SocialListing";
import ReactMarkdown from "react-markdown";

type Props = {
  items: FooterWidgetProps[];
};

const FooterWidgets: React.FC<Props> = ({ items }) => {
  const { data, isLoading } = useQuery<OptionDataType>(
    "options",
    getOptionData
  );

  const WidgetEls = [];
  if (data) {
    const opts = data.data.option.data.attributes;

    for (const d of items) {
      switch (d.Type) {
        case "Social":
          WidgetEls.push(<SocialListing key={"social"} />);
          break;

        case "Newsletter":
          WidgetEls.push(<NewsletterSignup key={"newsletter"} />);
          break;

        case "Supported_Credit_Cards":
          WidgetEls.push(
            <Box key={"supported_credit_cards"} mt={5}>
              <img
                src={opts.Credit_Cards.data.attributes.url}
                alt="credit cards"
              />
            </Box>
          );

          break;

        case "Address":
          WidgetEls.push(
            <Box className={styles.address} key={"address"} mt={5}>
              <ReactMarkdown>{opts.Address}</ReactMarkdown>
            </Box>
          );

          break;

        case "Copyright":
          WidgetEls.push(
            <Box key={"copyright"}>
              <Text
                mt={5}
                fontSize={10}
                color="#666"
                textTransform={"uppercase"}
              >
                {opts.Copyright}
              </Text>
            </Box>
          );

          break;
      }
    }
  }

  return <Box>{WidgetEls}</Box>;
};

export default FooterWidgets;
