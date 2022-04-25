import { gql } from "@apollo/client";

export const IMAGEBASE = gql`
  fragment IMAGEBASE on UploadFileEntityResponse {
    data {
      id
      attributes {
        url
        name
        previewUrl
      }
    }
  }
`;

export const CATEGORYBASE = gql`
  ${IMAGEBASE}
  fragment CATEGORYBASE on CategoryEntityResponse {
    data {
      id
      attributes {
        Title
        slug
        Image {
          ...IMAGEBASE
        }
      }
    }
  }
`;

export const TAGBASE = gql`
  fragment TAGBASE on TagEntityResponse {
    data {
      id
      attributes {
        Title
        slug
      }
    }
  }
`;

export const STOREBASE = gql`
  fragment STOREBASE on StoreEntity {
    id
    attributes {
      Title
      slug
      Description
      Featured_Image {
        ...IMAGEBASE
      }
      Rating
    }
  }
`;

export type LayoutBaseType = {
  __typename: string;
  id: string;
};

export type ImageType = {
  url: string;
  previewUrl: string;
  formats: any;
  name: string;
};
export type LayoutImageType = {
  data: {
    attributes: ImageType;
  };
};

export type LayoutCategoryType = {
  data: {
    attributes: {
      Title: string;
      slug: string;
      Image: LayoutImageType;
    };
  };
};

export type LayoutTagType = {
  data: {
    attributes: {
      Title: string;
      slug: string;
    };
  };
};

export type LayoutStoreType = {
  attributes: {
    Title: string;
    slug: string;
    Description: string;
    Featured_Image: LayoutImageType;
    Gallery: {
      data: {
        attributes: ImageType[];
      };
    };
    Rating: number;
  };
};
