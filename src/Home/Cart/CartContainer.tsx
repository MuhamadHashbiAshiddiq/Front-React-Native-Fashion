import React from "react";
import { Dimensions, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

import { Box, useTheme } from "../../components";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 682 * aspectRatio;
const minHeight = 228 * aspectRatio;
const snapPoints = [-(height - minHeight), 0];

interface CartProps {
  children: ReactNode;
}

const CartContainer = ({ children }: CartProps) => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      y: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(
        ctx.y + translationY,
        snapPoints[0],
        snapPoints[1]
      );
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(
        translateY.value,
        velocityY,
        snapPoints
      );
      translateY.value = withSpring(dest);
    },
  });
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Box flex={1} backgroundColor="secondary">
      <Animated.View
        style={[
          {
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            backgroundColor: "white",
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          },
          style,
        ]}
      >
        {children}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: theme.borderRadii.xl,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 5 * aspectRatio,
                backgroundColor: theme.colors.background2,
                width: 100 * aspectRatio,
                borderRadius: 2.5,
                marginBottom: theme.spacing.s,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Box>
  );
};

export default CartContainer;
