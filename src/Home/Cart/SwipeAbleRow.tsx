import React, {
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";

import {
  RoundedIconButton,
  useTheme,
  Box,
} from "../../components";
import { aspectRatio, Text } from "../../components/Theme";

interface SwipeAbleRowProps {
  children: ReactNode;
  onDelete: () => void;
  height: number;
}

const { width } = Dimensions.get("window");
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeAbleRow = ({
  children,
  onDelete,
  height: defaultHeight,
}: SwipeAbleRowProps) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const height = useSharedValue(0);
  const deleteItem = useCallback(() => {
    // ref.current?.animateNextTransition();
    onDelete();
  }, [onDelete]);

  const onGestureEvent = useAnimatedGestureHandler<{
    x: number;
  }>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(
        translateX.value,
        velocityX,
        snapPoints
      );
      translateX.value = withSpring(dest, {}, () => {
        if (dest === finalDestination) {
          height.value = withTiming(
            0,
            { duration: 250 },
            () => runOnJS(onDelete)()
          );
        }
      });
    },
  });

  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: theme.colors.background,
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View
        style={[StyleSheet.absoluteFill, deleteStyle]}
      >
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            theme.colors.danger,
            theme.colors.background,
          ]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />

        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignItems="center"
          flex={1}
        >
          <Text color="background" variant="header">
            Delete
          </Text>
        </Box>
      </Animated.View>
      
      <Animated.View
        style={[StyleSheet.absoluteFill, editStyle]}
      >
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[
            theme.colors.edit,
            theme.colors.background,
          ]}
          start={[1, 0.5]}
          end={[0.7, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
          flex={1}
        >
          <RoundedIconButton
            onPress={() => alert("Hello!")}
            name="plus"
            size={24}
            color="background"
            backgroundColor="primary"
          />
          <RoundedIconButton
            onPress={() => alert("Hello!")}
            name="minus"
            size={24}
            color="background"
            backgroundColor="danger"
          />
        </Box>
      </Animated.View>

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeAbleRow;
