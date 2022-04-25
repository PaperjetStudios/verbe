import { gql } from "@apollo/client";
import client from "../../config/api";
import { LayoutImageType } from "../layout/base";

export const modal_query = gql`
  query ($trigger: String) {
    notifications(filters: { Trigger: { eq: $trigger } }) {
      data {
        id
        attributes {
          Headline
          Subtitle
          Message
          Image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export type Notification = {
  id: string;
  attributes: {
    Headline: string;
    Subtitle: string;
    Message: string;
    Image: LayoutImageType;
  };
};

export type NotificationDataType = {
  notifications: {
    data: Notification[];
  };
};

export const getNotificationData = async (trigger: string) => {
  const data = await client(null).query<NotificationDataType>({
    query: modal_query,
    variables: { trigger: trigger },
  });

  return data;
};
