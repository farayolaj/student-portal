import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const variants = {
  button: defineStyle((props) => {
    const baseStyle = {
      lineHeight: "1.2",
      borderRadius: "md",
      fontWeight: "semibold",
      transitionProperty: "common",
      transitionDuration: "normal",
      paddingInline: 4,
      py: 3,
      _focusVisible: {
        boxShadow: "outline",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
        boxShadow: "none",
      },
      _hover: {
        textDecoration: "none",
        _disabled: {
          bg: "initial",
        },
      },
    };

    type AccessibleColor = {
      bg?: string;
      color?: string;
      hoverBg?: string;
      activeBg?: string;
    };

    /** Accessible color overrides for less accessible colors. */
    const accessibleColorMap: { [key: string]: AccessibleColor } = {
      yellow: {
        bg: "yellow.400",
        color: "black",
        hoverBg: "yellow.500",
        activeBg: "yellow.600",
      },
      cyan: {
        bg: "cyan.400",
        color: "black",
        hoverBg: "cyan.500",
        activeBg: "cyan.600",
      },
    };

    const { colorScheme: c } = props;

    if (c === "gray") {
      const bg = mode(`gray.100`, `whiteAlpha.200`)(props);

      return {
        ...baseStyle,
        bg,
        _hover: {
          textDecoration: "none",
          bg: mode(`gray.200`, `whiteAlpha.300`)(props),
          _disabled: {
            bg,
          },
        },
        _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
      };
    }

    const {
      bg = `${c}.500`,
      color = "white",
      hoverBg = `${c}.600`,
      activeBg = `${c}.700`,
    } = accessibleColorMap[c] ?? {};

    const background = mode(bg, `${c}.200`)(props);

    return {
      ...baseStyle,
      bg: background,
      color: mode(color, `gray.800`)(props),
      _hover: {
        textDecoration: "none",
        bg: mode(hoverBg, `${c}.300`)(props),
        _disabled: {
          bg: background,
        },
      },
      _active: { bg: mode(activeBg, `${c}.400`)(props) },
    };
  }),
};

export const linkTheme = defineStyleConfig({
  baseStyle: defineStyle({
    color: "primary",
  }),
  variants,
  defaultProps: {
    colorScheme: "primary",
  },
});
