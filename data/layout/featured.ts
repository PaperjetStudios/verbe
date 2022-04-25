import { gql } from "@apollo/client";
import {
  LayoutBaseType,
  LayoutImageType,
  CATEGORYBASE,
  LayoutCategoryType,
  IMAGEBASE,
} from "./base";

export const FEATURED = gql`
  ${CATEGORYBASE}
  fragment FEATURED on ComponentLayoutStoreListing {
    id
    __typename
    Title
    ImageMain {
      data {
        attributes {
          url
          formats
        }
      }
    }
    Category {
      ...CATEGORYBASE
    }
  }
`;

export type FeaturedProps = LayoutBaseType & {
  Title: string;
  Category: LayoutCategoryType;
  ImageMain: LayoutImageType;
};
