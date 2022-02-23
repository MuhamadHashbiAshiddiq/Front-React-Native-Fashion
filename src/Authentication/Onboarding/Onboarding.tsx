import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  useSharedValue,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";

import SliderImage from "./SliderImage";
import Subslide from "./SubSlide";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Dot from "./Dot";

import { Theme, makeStyles } from "../../components/Theme";
import { AuthNavigationProps } from "../../components/Navigation";

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
    picture: {
      src: require("../assets/image1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
    picture: {
      src: require("../assets/image2.png"),
      width: 2791,
      height: 3744,
    },
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday ",
    color: "#FFE4D9",
    picture: {
      src: require("../assets/image3.png"),
      width: 2738,
      height: 3244,
    },
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
    picture: {
      src: require("../assets/image4.png"),
      width: 1757,
      height: 2551,
    },
  },
];

export const assets = slides.map(
  (slide) => slide.picture.src
);

const Onboarding = ({
  navigation,
}: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);

  const AnimBgColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    );

    return {
      backgroundColor,
    };
  });

  const AnimBgColor2 = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    );

    return {
      backgroundColor,
    };
  });

  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      x.value = event.contentOffset.x;
    }
  );

  const SubSlideStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -x.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, AnimBgColor]}>
        {slides.map(({ picture }, index) => {
          return (
            <SliderImage
              key={index}
              index={index}
              scrollOffset={x}
              picture={picture}
            />
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              {...{ title, picture: picture.src }}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            AnimBgColor2,
          ]}
        />
        <Animated.View style={styles.footerContent}>
          <Animated.View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                key={index}
                scrollOffset={x}
                index={index}
              />
            ))}
          </Animated.View>

          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: "row",
                width: width * slides.length,
              },
              SubSlideStyles,
            ]}
          >
            {slides.map(
              ({ subtitle, description }, index) => {
                const last = index === slides.length - 1;
                return (
                  <Subslide
                    key={index}
                    onPress={() => {
                      if (last) {
                        navigation.navigate("Welcome");
                      } else {
                        scroll.current?.scrollTo({
                          x: width * (index + 1),
                          animated: true,
                        });
                      }
                    }}
                    last={index === slides.length - 1}
                    {...{ subtitle, description }}
                  />
                );
              }
            )}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomEndRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default Onboarding;
