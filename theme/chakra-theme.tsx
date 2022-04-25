import { extendTheme } from "@chakra-ui/react";

import { default as default_colors } from "./colors";
import sizes from "./sizes";

const styles = {
  colors: {
    main: {
      50: "#ccc",
      100: "#444",

      300: "#444",
      400: "#444",
      500: "#444",
      600: "#444",
      700: "#444",
      800: "#444",
      900: "#999",
    },
    ratings: {
      100: "#EEEEEE",

      500: "#FEB53E",
    },
  },
  components: {
    Select: {
      variants: {
        white: {
          bg: "white",
        },
      },
    },
    Tag: {
      variants: {
        main: {
          background: "#444",
          color: "#fff",
        },
      },
    },
    InputGroup: {
      variants: {
        underline: {
          background: "transparent",
        },
      },
    },
    Input: {
      variants: {
        underline: {
          _component: {
            borderRadius: "0",
            bg: "transparent",
            border: "none",
            borderBottom: "1px solid #ccc",
          },
        },
      },
    },
    Button: {
      variants: {
        main: {
          px: 50,
          py: 6,
          bg: default_colors.dark,
          color: default_colors.light,
          "&:hover": {
            bg: default_colors.light,
            color: default_colors.dark,
          },
        },
        verbe: {
          px: 6,
          py: 4,
          fontSize: "sm",
          borderRadius: 3,
          bg: "#44D7B6",
          color: default_colors.dark,
          textTransform: "uppercase",

          "&:hover": {
            bg: default_colors.light,
            color: default_colors.dark,
          },
        },
        info: {
          px: 10,
          py: 6,
        },
      },
    },
    IconButton: {
      variants: {
        transparent: {
          bg: "transparent",
          opacity: 0.8,
          "&:hover": {
            bg: "transparent",
            opacity: 0.8,
          },
        },
      },
    },
  },
};

export const theme = extendTheme(styles);
