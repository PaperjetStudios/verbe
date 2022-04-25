import { gql } from "@apollo/client";
import client from "../../config/api";

export const main_menu_query = gql`
  query {
    menu {
      data {
        id
        attributes {
          Item {
            ... on ComponentMenuMenuItem {
              Title
              Extra_Class
              Page {
                data {
                  attributes {
                    slug
                  }
                }
              }
              Category {
                data {
                  attributes {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const footer_menu_query = gql`
  query {
    footerMenu {
      data {
        attributes {
          Footer_Columns {
            ... on ComponentMenuFooterColumns {
              Title
              Items {
                ... on ComponentMenuMenuItem {
                  Title
                  Extra_Class
                  Category {
                    data {
                      attributes {
                        Title
                        slug
                      }
                    }
                  }
                  Page {
                    data {
                      attributes {
                        Title
                        slug
                      }
                    }
                  }
                  Url
                }
              }
              Widgets {
                ... on ComponentMenuWidgets {
                  Type
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type MainMenuItemType = {
  Title: string;
  Extra_Class: string;
  Page: {
    data: {
      attributes: {
        slug: string;
      };
    };
  };
  Category: {
    data: {
      attributes: {
        slug: string;
      };
    };
  };
  Url: string;
};

export type MainMenuDataType = {
  data: {
    menu: {
      data: {
        id: string | number;
        attributes: {
          Item: MainMenuItemType[];
        };
      };
    };
  };
};

export type FooterWidgetProps = {
  Type: string;
  id: string;
};

export type FooterMenuDataType = {
  data: {
    footerMenu: {
      data: {
        id: string | number;
        attributes: {
          Footer_Columns: {
            Items: MainMenuItemType[];
            Title: string;
            Widgets: FooterWidgetProps[];
          }[];
        };
      };
    };
  };
};

export const getMainMenu = async () =>
  await client(null).query({
    query: main_menu_query,
  });

export const getFooterMenu = async () =>
  await client(null).query({
    query: footer_menu_query,
  });
