import * as yup from "yup";

export const emptyAddress = {
  Street_Address_1: "",
  Street_Address_2: "",
  Suburb: "",
  City: "",
  Country: "",
  Zip_Code: "",
};

export const emptyAddressObject = {
  Address: [emptyAddress],
};

export const schema = yup.object().shape({
  Street_Address_1: yup.string().required("Street Address 1 is required"),
  Suburb: yup.string().required("Suburb is required"),
  City: yup.string().required("City is required"),
  Country: yup.string().required("Country is required"),
  Zip_Code: yup.string().required("Zip Code is required"),
});
