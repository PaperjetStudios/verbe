import { gql } from "@apollo/client";
import { BASE_CATEGORY } from "../categories/queries";
import { BASE_TAG } from "../tags/queries";

export const PRODUCT_FRAGMENT = gql`
  ${BASE_CATEGORY}
  ${BASE_TAG}

  fragment PRODUCT_FRAGMENT on ProductEntity {
    id
    attributes {
      Title
      Subtitle
      slug
      Rating
      RatingTotal
      Description
      FabricContent
      WashcareInstructions
      Colour
      Variation {
        Quantity
        Size
      }
      SizeGuide {
        Title
        SizeValue {
          Value
        }
      }
      Price
      SKU
      Featured_Image {
        data {
          id
          attributes {
            url
            name
            formats
          }
        }
      }
      Gallery {
        data {
          id
          attributes {
            url
            name
            formats
          }
        }
      }
      Reviews {
        data {
          id
          attributes {
            UserId
          }
        }
      }
      Tags {
        data {
          id
          attributes {
            ...BASE_TAG
          }
        }
      }
      Categories {
        data {
          id
          attributes {
            ...BASE_CATEGORY
          }
        }
      }
    }
  }
`;
export const FIND_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_FRAGMENT}

  query ($slug: String!) {
    findProductBySlug(slug: $slug) {
      data {
        ...PRODUCT_FRAGMENT
      }
    }
  }
`;

export const FIND_PRODUCT_BY_CAT_SLUG = (
  filterString: string,
  sortString: string
) => {
  const graph = `
  ${PRODUCT_FRAGMENT}
  query ($slug: String!, $page: Int!, $pageSize: Int!) {
    products(
      ${sortString}
      filters: { Categories: { slug: { eq: $slug } } ${filterString} }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        ...PRODUCT_FRAGMENT
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

  console.log("FFIND", graph);
  return gql`
  ${PRODUCT_FRAGMENT}
  query ($slug: String!, $page: Int!, $pageSize: Int!) {
    products(
      ${sortString}
      filters: { Categories: { slug: { eq: $slug } } ${filterString} }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        ...PRODUCT_FRAGMENT
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;
};

export const FIND_PRODUCT_BY_TAG = (
  filterString: string,
  sortString: string
) => gql`
${PRODUCT_FRAGMENT}
query ($slug: String!, $page: Int!, $pageSize: Int!) {
  products(
    ${sortString}
    filters: { Tags: { slug: { eq: $slug } } ${filterString} }
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    data {
      ...PRODUCT_FRAGMENT
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}
`;

export const GET_PRODUCTS_BY_ID = (
  filterString: string,
  sortString: string
) => gql`
${PRODUCT_FRAGMENT}
query ($ids: [ID]!) {
  products(
  ${sortString}
    filters: { id: { in: $ids } ${filterString} }
  ) {
    data {
      ...PRODUCT_FRAGMENT
    }
  }
}
`;

export const GET_PRODUCT_BY_ID = gql`
  ${PRODUCT_FRAGMENT}
  query ($id: ID!) {
    product(id: $id) {
      data {
        ...PRODUCT_FRAGMENT
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT($id: ID!, $data: ProductInput!) {
    updateProduct(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  mutation ($Title: String, $Description: String) {
    createProduct(data: { Title: $Title, Description: $Description }) {
      data {
        ...PRODUCT_FRAGMENT
      }
    }
  }
`;
