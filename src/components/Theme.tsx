import React, { ReactNode } from "react";
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import {
  ThemeProvider as ReStyleThemeProvider,
  createBox,
  createText,
  useTheme as useReTheme,
} from "@shopify/restyle";

export const palette = {
  green: "#2CB9B0",
  white: "white",
  violet: "#442CB9",
  orange: "#FE5E33",
  pink: "#FF87A2",
  yellow: "#FFC641",
  lightBlue: "#BFEAF5",
};

export const theme = {
  colors: {
    background: palette.white,
    primary: palette.green,

    button: "#0C0D34",
    secondary: "#0C0D34",
    title: "#0C0D34",
    text: "rgba(12, 13, 52, 0.7)",
    background2: "#F4F0EF",
    info: "#8A8D90",
    danger: "#FF0058",
    primaryLight: "#E7F9F7",

    graph1: palette.orange,
    graph2: palette.yellow,

    drawer1: palette.orange,
    drawer2: palette.yellow,
    drawer3: palette.pink,
    drawer4: palette.violet,
  },

  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },

  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "background",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title3: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
      textAlign: "center",
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => (
  <ReStyleThemeProvider {...{ theme }}>
    {children}
  </ReStyleThemeProvider>
);

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };

// export default theme;
