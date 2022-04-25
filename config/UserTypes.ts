export type Address = {
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Province: string;
  Country: string;
  Zip_Code: string;
};

export type User = {
  isLoggedIn: boolean;
  jwt: string;
  user?: {
    id: string;
    email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    Wishlist: {};
    Address: Address[];
  };
};

export const emptyUser = {
  isLoggedIn: false,
  jwt: "",
  user: undefined,
};
