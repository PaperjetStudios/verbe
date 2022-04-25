import { gql } from "@apollo/client";
import { LayoutBaseType, LayoutImageType } from "./base";

export const TEXTBLOCK = gql`
  fragment TEXTBLOCK on ComponentLayoutText {
    id
    __typename
    Title
    Text
    ImageMain {
      data {
        attributes {
          url
          formats
        }
      }
    }
    ImageRight
  }
`;

export type TextBlockProps = LayoutBaseType & {
  Title: string;
  Text: string;
  ImageMain: LayoutImageType;
  ImageRight: boolean;
};
