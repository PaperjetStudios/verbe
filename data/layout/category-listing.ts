import { gql } from "@apollo/client";
import {
  LayoutBaseType,
  LayoutImageType,
  CATEGORYBASE,
  LayoutCategoryType,
  IMAGEBASE,
} from "./base";

export const CATEGORYLISTING = gql`
  ${CATEGORYBASE}
  ${IMAGEBASE}
  fragment CATEGORYLISTING on ComponentLayoutCategoryListing {
    id
    __typename
    Title
    Item {
      category {
        ...CATEGORYBASE
      }
      Image {
        ...IMAGEBASE
      }
    }
  }
`;

export type CategoryListingItem = {
  category: LayoutCategoryType;
  Image: LayoutImageType;
};
export type CategoryListingProps = LayoutBaseType & {
  Title: string;
  Item: CategoryListingItem[];
};
