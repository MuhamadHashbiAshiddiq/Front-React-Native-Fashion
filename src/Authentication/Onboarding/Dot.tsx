import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface DotProps {
  index: number;
  scrollOffset: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");

const Dot = ({ index, scrollOffset }: DotProps) => {
  const DotStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value / width,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollOffset.value / width,
      [index - 1, index, index + 1],
      [1, 1.25, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[styles.dot, DotStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: "#2CB9B0",
    width: 6,
    height: 6,
    borderRadius: 4,
    marginRight: 8,
  },
});

export default Dot;
