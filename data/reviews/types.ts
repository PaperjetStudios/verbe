export type Review = {
  Username: string;
  UserId: string;
  Product: {
    data: {
      id: string;
    };
  };
  Store: {
    data: {
      id: string;
    };
  };
  Message: string;
  Rating: number | string;
  Title: string;
  createdAt: string;
};

export type ReviewsDataType = {
  reviews: {
    data: {
      attributes: Review;
    }[];
  };
};
