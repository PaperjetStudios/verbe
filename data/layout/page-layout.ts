import { gql } from "@apollo/client";
import client from "../../config/api";
import { CATEGORYLISTING } from "./category-listing";
import { FEATURED } from "./featured";
import { DETAILSLISTING } from "./details-listing";
import { FEATUREDTHREE } from "./featured-three";
import { GALLERY } from "./gallery";
import { PRODUCTLISTING } from "./product-listing";
import { SMALLBANNER } from "./small-banner";
import { TEXTBLOCK } from "./text-block";
import { SIGNUP } from "./signup";

export const page_layout_query = gql`
  ${GALLERY}
  ${FEATUREDTHREE}
  ${DETAILSLISTING}
  ${SMALLBANNER}
  ${PRODUCTLISTING}
  ${TEXTBLOCK}
  ${CATEGORYLISTING}
  ${FEATURED}
  ${SIGNUP}

  query ($slug: String!) {
    findPageBySlug(slug: $slug) {
      data {
        attributes {
          Title
          MetaDescription
          Featured_Image {
            data {
              attributes {
                url
              }
            }
          }
          Layout {
            ... on ComponentLayoutGallery {
              ...GALLERY
            }
            ... on ComponentLayoutFeaturedThree {
              ...FEATUREDTHREE
            }
            ... on ComponentLayoutStoreListing {
              ...FEATURED
            }
            ... on ComponentLayoutDetailsListing {
              ...DETAILSLISTING
            }
            ... on ComponentLayoutProductListing {
              ...PRODUCTLISTING
            }
            ... on ComponentLayoutCategoryListing {
              ...CATEGORYLISTING
            }
            ... on ComponentLayoutSmallBanner {
              ...SMALLBANNER
            }
            ... on ComponentLayoutText {
              ...TEXTBLOCK
            }
            ... on ComponentLayoutSignUp {
              ...SIGNUP
            }
          }
        }
      }
    }
  }
`;

export type PageDataType = {
  findPageBySlug: {
    data: {
      attributes: {
        Title: string;
        MetaDescription: string;
        Layout: any;
        Featured_Image: {
          data: {
            attributes: {
              url: string;
              formats: string;
            };
          };
        };
      };
    };
  };
};

export const getPageData = async (slug: string) => {
  try {
    const data = await client(null).query<PageDataType>({
      query: page_layout_query,
      variables: { slug: slug },
    });

    return data;
  } catch (e) {
    console.log("error", e);
  }
};
