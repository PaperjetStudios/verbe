import { gql } from "@apollo/client";
import {
  CATEGORYBASE,
  IMAGEBASE,
  LayoutBaseType,
  LayoutCategoryType,
  LayoutImageType,
} from "./base";

export const FEATUREDTHREE = gql`
  ${IMAGEBASE}
  ${CATEGORYBASE}
  fragment FEATUREDTHREE on ComponentLayoutFeaturedThree {
    id
    __typename
    Featured {
      id
      Text
      category {
        ...CATEGORYBASE
      }
      Image {
        ...IMAGEBASE
      }
    }
  }
`;

export type FeaturedThreeItemProps = {
  id: string;
  Text: string;
  category: LayoutCategoryType;
  Image: LayoutImageType;
};

export type FeaturedThreeProps = LayoutBaseType & {
  Featured: FeaturedThreeItemProps[];
};
