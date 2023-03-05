import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const primary = definePartsStyle({
  field: defineStyle({
    bg: "white",
    border: "2px solid",
    borderColor: "transparent",
    _hover: {
      bg: "whiteAlpha.100",
    },
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all",
    },
    _focusVisible: {
      bg: "transparent",
    },
  }),
  addon: defineStyle({
    border: "2px solid",
    borderColor: "transparent",
    bg: "white",
  }),
});

export const inputTheme = defineMultiStyleConfig({ variants: { primary } });
