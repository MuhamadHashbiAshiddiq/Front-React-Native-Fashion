import React, { useRef } from "react";
import Animated, {
  divide,
  multiply,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import {
  interpolateColor,
  useScrollHandler,
} from "react-native-redash";

import Subslide from "./Subslide";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Dot from "./Dot";

import { useTheme } from "../../components";
import {
  ThemeContext,
  makeStyles,
} from "../../components/Theme";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../../components/Navigation";

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
}: StackNavigationProps<AuthenticationRoutes, "Onboarding">) => {
  const styles = useStyles();
  const theme = useTheme();
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, { backgroundColor }]}
      >
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [
              (index - 0.6) * width,
              index * width,
              (index + 0.6) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[styles.underlay, { opacity }]}
              key={index}
            >
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height:
                    ((width - theme.borderRadii.xl) *
                      picture.height) /
                    picture.width,
                }}
              />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              {...{ title, picture }}
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
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                key={index}
                currentIndex={divide(x, width)}
                {...{ index, x }}
              />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
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
                        scroll.current?.getNode().scrollTo({
                          x: width * (index + 1),
                          animated: true,
                        });
                      }
                    }}
                    {...{ subtitle, description, last }}
                  />
                );
              }
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },

  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },

  footer: {
    flex: 1,
  },

  footerContent: {
    flex: 1,
    backgroundColor: "white",
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
