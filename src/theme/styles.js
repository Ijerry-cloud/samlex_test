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
        bg: mode("#232333", "#f9f5e9")(props),
        fontFamily: 'Helvetica, sans-serif'
      },
      html: {
        fontFamily: 'Helvetica, sans-serif'
      },
      "::-webkit-scrollbar": {
        width: "5px", // Keep the width as desired
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "gray.400", // Customize scrollbar thumb color
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "black", // Set the unscrolled part to black
      },
    }),
  },
};
