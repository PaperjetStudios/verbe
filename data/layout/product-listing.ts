import { gql } from "@apollo/client";
import {
  LayoutBaseType,
  CATEGORYBASE,
  LayoutCategoryType,
  LayoutTagType,
  TAGBASE,
} from "./base";

export const PRODUCTLISTING = gql`
  ${CATEGORYBASE}
  ${TAGBASE}
  fragment PRODUCTLISTING on ComponentLayoutProductListing {
    id
    __typename
    Title
    category {
      ...CATEGORYBASE
    }
    tag {
      ...TAGBASE
    }
    Count
    Grid
  }
`;

export type ProductListingProps = LayoutBaseType & {
  Title: string;
  category: LayoutCategoryType;
  tag: LayoutTagType;
  Count: number;
  Grid: number;
};
