import React, { useState } from "react";
import { useTiming } from "react-native-redash";
import {
  sub,
  useDerivedValue,
} from "react-native-reanimated";

import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";

import {
  Box,
  Button,
  Header,
  Text,
} from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { BorderlessButton } from "react-native-gesture-handler";

const cards = [
  {
    index: 3,
    source: require("../../Authentication/assets/image4.png"),
  },
  {
    index: 2,
    source: require("../../Authentication/assets/image3.png"),
  },
  {
    index: 1,
    source: require("../../Authentication/assets/image2.png"),
  },
  {
    index: 0,
    source: require("../../Authentication/assets/image1.png"),
  },
];

const step = 1 / (cards.length - 1);

const OutfitIdeas = ({
  navigation,
}: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTiming(currentIndex);

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Outfit Ideas"
        left={{
          icon: "menu",
          onPress: () => navigation.openDrawer(),
        }}
        right={{
          icon: "shopping-bag",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
      <Categories />
      <Box flex={1}>
        <Background />
        {cards.map(
          ({ index, source }) =>
            currentIndex < index * step + step && (
              <Card
                key={index}
                index={index}
                aIndex={aIndex}
                step={step}
                // position={sub(index * step, aIndex)}
                onSwipe={() =>
                  setCurrentIndex((prev) => prev + step)
                }
                {...{ source }}
              />
            )
        )}
        {/* <Box
          flex={1}
          marginBottom="xl"
          justifyContent="flex-end"
          alignItems="center"
        >
          <BorderlessButton
            onPress={() =>
              navigation.navigate("ProductList")
            }
          >
            <Text variant="hero" fontSize={16}>
              List Product
            </Text>
          </BorderlessButton>
        </Box> */}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
