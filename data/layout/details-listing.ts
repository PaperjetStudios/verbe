import { gql } from "@apollo/client";
import { LayoutBaseType } from "./base";

export const DETAILSLISTING = gql`
  fragment DETAILSLISTING on ComponentLayoutDetailsListing {
    id
    __typename
    Details {
      Icon
      Heading
      Description
    }
  }
`;

export type DetailsListingItem = {
  Icon: string;
  Heading: string;
  Description: string;
};
export type DetailsListingProps = LayoutBaseType & {
  Details: DetailsListingItem[];
};
