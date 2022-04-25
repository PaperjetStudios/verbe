export type FormType = {
  email: string;
  Phone: string;
  LastName: string;
  FirstName: string;
  Street_Address_1: string;
  Street_Address_2: string;
  Suburb: string;
  City: string;
  Country: string;
  Zip_Code: string;
  password: string;
  confirm_password: string;
  create_profile_check: boolean;
  guestProfile: boolean;
  addressRequired: boolean;
};

export const empty = {
  email: "",
  Phone: "",
  LastName: "",
  FirstName: "",
  Street_Address_1: "",
  Street_Address_2: "",
  Suburb: "",
  City: "",
  Country: "",
  Zip_Code: "",
  password: "",
  confirm_password: "",
  create_profile_check: true,
  guestProfile: true,
  addressRequired: false,
};
