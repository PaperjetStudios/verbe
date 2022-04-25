import { gql } from "@apollo/client";
import { IMAGEBASE, LayoutBaseType, LayoutImageType } from "./base";

export const SMALLBANNER = gql`
  ${IMAGEBASE}
  fragment SMALLBANNER on ComponentLayoutSmallBanner {
    id
    __typename
    BigText
    SmallText
    Background {
      ...IMAGEBASE
    }
  }
`;

export type SmallBannerProps = LayoutBaseType & {
  BigText: string;
  SmallText: string;
  Background: LayoutImageType;
};
