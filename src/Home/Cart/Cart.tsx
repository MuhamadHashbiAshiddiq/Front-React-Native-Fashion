import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";

import {
  Box,
  Header,
  Text,
  useTheme,
} from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { aspectRatio } from "../../components/Theme";

import CartContainer from "./CartContainer";
import Item from "./Item";

const { width } = Dimensions.get("window");
const height = 100 * aspectRatio;
const d =
  "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const Cart = ({
  navigation,
}: HomeNavigationProps<"Cart">) => {
  const theme = useTheme();

  return (
    <CartContainer>
      <Box backgroundColor="primary">
        <Header
          dark
          left={{
            icon: "arrow-left",
            onPress: () => navigation.goBack(),
          }}
          title="Shopping Cart"
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          bottom: height * 5.08,
          left: 0,
          right: 0,
          height,
        }}
      >
        <Svg
          style={StyleSheet.absoluteFill}
          viewBox="0 0 375 100"
        >
          <Path d={d} fill={theme.colors.primary} />
        </Svg>
        <Text
          variant="title2"
          textAlign="center"
          color="background"
        >
          3 Items Added
        </Text>
      </Box>
      <Box height={height / 2} />
      <ScrollView
        style={{
          borderBottomLeftRadius: theme.borderRadii.xl,
          borderBottomRightRadius: theme.borderRadii.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    </CartContainer>
  );
};

export default Cart;
