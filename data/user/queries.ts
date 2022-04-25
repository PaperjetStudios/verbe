import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment USER_FRAGMENT on UsersPermissionsUserEntityResponse {
    data {
      id
      attributes {
        email
        LastName
        FirstName
        Phone
        Wishlist
        Address {
          Street_Address_1
          Street_Address_2
          Suburb
          City
          Country
          Zip_Code
        }
        store {
          data {
            id
            attributes {
              slug
            }
          }
        }
      }
    }
  }
`;
