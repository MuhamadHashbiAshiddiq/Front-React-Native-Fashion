import React from "react";
import { Image, Dimensions } from "react-native";

import { Box } from "./Theme";

export const assets = [
  require("./assets/patterns/patterns1.png"),
];

const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
}

const Container = () => {
  return (
    <Box flex={1}>
      <Box>
        <Image
          source={assets[0]}
          style={{ width, height }}
        />
      </Box>
    </Box>
  );
};

export default Container;
