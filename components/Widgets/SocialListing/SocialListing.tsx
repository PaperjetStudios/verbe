import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { getOptionData, OptionDataType } from "../../../data/settings/options";

import styles from "./SocialListing.module.scss";

export type SocialLink = {
  Type: string;
  Url: string;
};

type Props = {};

const SocialListing: React.FC<Props> = () => {
  const { data, isLoading } = useQuery<OptionDataType>(
    "options",
    getOptionData
  );

  if (!data) {
    return <></>;
  }

  const socialLinks = data.data.option.data.attributes.SocialLinks.map(
    (obj: SocialLink) => {
      let name = "";
      let icon = "";

      switch (obj.Type) {
        case "Facebook":
          name = "Facebook";
          icon = "facebook-f";
          break;
        case "Instagram":
          name = "Instagram";
          icon = "instagram";
          break;
        case "Twitter":
          name = "Twitter";
          icon = "twitter";
          break;
      }

      return (
        <a key={`social_link_${name}`} href={obj.Url} title={name}>
          <IconButton
            variant={"main"}
            height="40px"
            width="40px"
            borderRadius={"100%"}
            className={styles.icon}
            aria-label={`social-${icon}`}
            icon={<FontAwesomeIcon icon={["fab", icon as IconName]} />}
          />
        </a>
      );
    }
  );
  return <Flex gap={2}>{socialLinks}</Flex>;
};

export default SocialListing;
