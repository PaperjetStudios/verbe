import { gql } from "@apollo/client";
import client from "../../config/api";

export const options_query = gql`
  query {
    option {
      data {
        attributes {
          Site_Title
          Notice
          Copyright
          Address
          Logo {
            data {
              attributes {
                url
              }
            }
          }
          Credit_Cards {
            data {
              attributes {
                url
              }
            }
          }
          DefaultPageImage {
            data {
              attributes {
                url
                formats
              }
            }
          }
          SocialLinks {
            Type
            Url
          }
        }
      }
    }
  }
`;
export type OptionDataType = {
  data: {
    option: {
      data: {
        attributes: {
          Site_Title: string;
          Notice: string;
          Copyright: string;
          Address: string;
          Logo: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          Credit_Cards: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
          SocialLinks: {
            Type: string;
            Url: string;
          }[];
          DefaultPageImage: {
            data: {
              attributes: {
                url: string;
                formats: string;
              };
            };
          };
        };
      };
    };
  };
};

export const getOptionData = async () =>
  (await client(null).query({
    query: options_query,
  })) as OptionDataType;
