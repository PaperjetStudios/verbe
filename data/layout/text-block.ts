import { gql } from "@apollo/client";
import { LayoutBaseType, LayoutImageType } from "./base";

export const TEXTBLOCK = gql`
  fragment TEXTBLOCK on ComponentLayoutText {
    id
    __typename
    Text
  }
`;

export type TextBlockProps = LayoutBaseType & {
  Text: string;
};
