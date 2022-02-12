import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { useTheme } from "./Theme";

const { width } = Dimensions.get("window");

const borderRadius = 50;
const viewBox = { width, height: borderRadius * 2 };
const d = `
  M 0 0
  H ${viewBox.width}
  A ${borderRadius} ${borderRadius} 0 0 1 ${
  viewBox.width - borderRadius
} ${borderRadius}
  H ${borderRadius}
  A 0 ${borderRadius} 0 0 0 0 ${viewBox.height}
`;
interface ContentFooterProps {
  children: React.ReactNode;
}

const ContentFooter = ({
  children,
}: ContentFooterProps) => {
  const theme = useTheme();

  return (
    <>
      <Image
        source={require("../components/assets/patterns/patterns2.png")}
        style={styles.background}
      />
      {children}
      <Svg
        width={width}
        height={viewBox.height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join(
          ""
        )}
      >
        <Path fill={theme.colors.background} d={d} />
      </Svg>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height: (width * 24) / 32,
  },
});

export default ContentFooter;
