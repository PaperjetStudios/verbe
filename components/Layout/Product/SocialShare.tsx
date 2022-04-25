import { Box } from "@chakra-ui/react";

import React from "react";
import { Icons } from "../../Common/icons";

import styles from "./SocialShare.module.scss";

type Props = {
  providers?: {
    provider: string;
    linkURL?: string;
  }[];
  path: string;
};

const SocialShare: React.FC<Props> = ({
  providers = [{ provider: "facebook" }, { provider: "twitter" }],
  path,
}) => {
  return (
    <Box display="flex" gap={2} justifyContent="center" alignItems={"center"}>
      {providers.map((social, ind) => {
        if (social.provider === "facebook") {
          return (
            <Box
              key="facebook_share"
              className="fb-share-button"
              data-href={
                social?.linkURL
                  ? encodeURIComponent(social.linkURL)
                  : encodeURIComponent(path)
              }
              data-layout="button_count"
              data-size="small"
            >
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${
                  social?.linkURL
                    ? encodeURIComponent(social.linkURL)
                    : encodeURIComponent(path)
                }&amp;src=sdkpreparse`}
                className={styles.socialShare}
              >
                {Icons.social.facebook}
              </a>
            </Box>
          );
        } else if (social.provider === "instagram") {
          return (
            <Box key="instagram">
              <a
                className={styles.socialShare}
                key="instagram"
                rel="noreferrer"
                target="_blank"
                href="https://www.instagram.com/"
              >
                {Icons.social.instagram}
              </a>
            </Box>
          );
        } else if (social.provider === "twitter") {
          return (
            <Box key="twitter">
              <a
                className={styles.socialShare}
                key="twitter_share"
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                // className="twitter-share-button"
                data-text={
                  social?.linkURL
                    ? encodeURIComponent(social.linkURL)
                    : encodeURIComponent(path)
                }
                data-url={
                  social?.linkURL
                    ? encodeURIComponent(social.linkURL)
                    : encodeURIComponent(path)
                }
                data-show-count="false"
              >
                {Icons.social.twitter}
              </a>
            </Box>
          );
        } else if (social.provider === "pinterest") {
          return (
            <Box key="pinterest">
              <a
                key="pintrest_share"
                rel="noreferrer"
                target="_blank"
                data-pin-do="embedPin"
                href="https://www.pinterest.com/pin/create/button"
              >
                {Icons.social.pinterest}
              </a>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default SocialShare;
