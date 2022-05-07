import { PriceFilterProps, SizeFilterProps } from "../atoms/filter/filterAtoms";
import { Category } from "../categories/types";
import { ImageType } from "../layout/base";
import { Review } from "../reviews/types";

import { Tag } from "../tags/types";

export type SingleVariation = {
  Size: string;
  Quantity: number;
};
export type SizeGuideItem = {
  Title: string;
  SizeValue: {
    Value: string;
  }[];
};
export type SingleProductAttributes = {
  Title: string;
  Description: string;
  FabricContent: string;
  WashcareInstructions: string;
  Price: number;
  SKU: string;
  Subtitle: string;
  Rating: number;
  RatingTotal: any;
  slug: string;
  Variation: SingleVariation[];
  SizeGuide: SizeGuideItem[];
  Colour: string;
  Featured_Image: {
    data: {
      attributes: ImageType;
    };
  };
  Gallery: {
    data: {
      attributes: ImageType;
    }[];
  };
  Tags: {
    data: Tag[];
  };
  Reviews: {
    data: {
      attributes: Review;
    }[];
  };
  Categories: {
    data: Category[];
  };
};

export type SingleProduct = {
  id: string | number;
  attributes: SingleProductAttributes;
};
// FOR CART

export type SingleProductAttributesCart = {
  Title: string;
  Description: string;
  Price: number;
  SKU: string;
  Subtitle: string;
  slug: string;
  Variation: SingleVariation[];
  Featured_Image: {
    data: {
      attributes: ImageType;
    };
  };
};

export type SingleCartProduct = {
  id: string | number;
  attributes: SingleProductAttributesCart;
};

export type PaginationType = {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};
export type ProductProps = {
  data: { products: { data: SingleProduct[]; meta: PaginationType } };
};
export type ProductSingleProps = {
  data: {
    findProductBySlug: {
      data: SingleProduct;
    };
  };
};

export type ProductFilters = {
  price?: PriceFilterProps;
  size?: SizeFilterProps;
  instock?: Boolean | null;
};
