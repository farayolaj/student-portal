import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    boxShadow: "lg",
  },
});

const defaultProps = {
  size: "sm",
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, defaultProps });
