import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#fff9e9", "#f9f5e9")(props),
        fontFamily: 'Helvetica, sans-serif'
      },
      html: {
        fontFamily: 'Helvetica, sans-serif'
      }
    }),
  },
};
