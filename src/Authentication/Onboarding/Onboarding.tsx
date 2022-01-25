import React from "react";
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useValue } from "react-native-redash";

import Slide from "./Slide";

const { width, height } = Dimensions.get("window");
const Onboarding = () => {
  const x = useValue(0);
  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Excentric" />
          <Slide label="Funky" right />
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "cyan",
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
    backgroundColor: "white",
  },
  slider: {
    height: 0.61 * height,
    backgroundColor: "cyan",
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
});

export default Onboarding;
