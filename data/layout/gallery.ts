import { gql } from "@apollo/client";
import { LayoutBaseType, LayoutImageType } from "./base";

export const GALLERY = gql`
  fragment GALLERY on ComponentLayoutGallery {
    id
    __typename
    Image {
      Source {
        data {
          attributes {
            url
          }
        }
      }
      Text
      cta_link
      cta_title
    }
  }
`;

export type ComponentLayoutGalleryItem = {
  Source: LayoutImageType;
  Text: string;
  cta_link: string;
  cta_title: string;
};
export type ComponentLayoutGallery = LayoutBaseType & {
  Image: ComponentLayoutGalleryItem[];
};
