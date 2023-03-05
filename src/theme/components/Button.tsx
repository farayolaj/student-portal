import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  variants: {
    transparent: {
      bg: "transparent",
    },
  },
  defaultProps: {
    colorScheme: "primary",
  },
});
