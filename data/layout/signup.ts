import { gql } from "@apollo/client";
import { LayoutBaseType, LayoutImageType } from "./base";

export const SIGNUP = gql`
  fragment SIGNUP on ComponentLayoutSignUp {
    id
    __typename
    Title
    Background {
      data {
        attributes {
          url
          formats
        }
      }
    }
  }
`;

export type SignUpProps = LayoutBaseType & {
  Title: string;
  Background: LayoutImageType;
};
