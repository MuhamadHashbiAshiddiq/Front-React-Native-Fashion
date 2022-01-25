import React, { useRef } from "react";
import Animated, {
  multiply,
} from "react-native-reanimated";
import Subslide from "./Subslide";

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

import Slide, { SLIDE_HEIGHT } from "./Slide";

const BORDER_RADIUS = 75;

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday ",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
  },
];

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);

  // scrollHandler useScrollHandler
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  const onScroll = onScrollEvent({ x });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, { backgroundColor }]}
      >
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          bounces={false}
          {...{ onScroll }}
        >
          {slides.map(({ title }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              {...{ title }}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            },
          ]}
        >
          {slides.map(
            ({ subtitle, description }, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current.getNode().scrollTo({
                      x: width * (index + 1),
                      animated: true,
                    });
                  }
                }}
                last={index === slides.length - 1}
                {...{ subtitle, description }}
              />
            )
          )}
        </Animated.View>
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
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },

  footer: {
    flex: 1,
  },

  footerContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

export default Onboarding;
