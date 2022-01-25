import React from "react";
import Animated from "react-native-reanimated";

import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  interpolateColor,
  onScrollEvent,
  useValue,
} from "react-native-redash";

import Slide from "./Slide";

const { width, height } = Dimensions.get("window");
const Onboarding = () => {
  const x = useValue(0);

  // useScrollEvents
  const backgroundColor = interpolateColor(x, {
    inputRange: [0, width, width * 2, width * 3],
    outputRange: [
      "#BFEAF5",
      "#BEECC4",
      "#FFE4D9",
      "#FFDDDD",
    ],
  });

  const onScroll = onScrollEvent({ x });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, { backgroundColor }]}
      >
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...{ onScroll }}
        >
          <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Excentric" />
          <Slide label="Funky" right />
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopLeftRadius: 75,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
  },
  slider: {
    height: 0.61 * height,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
});

export default Onboarding;
