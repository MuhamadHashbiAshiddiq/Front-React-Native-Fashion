import React from "react";
import { Dimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DrawerItem, { DrawerItemProps } from "./DrawerItem";

import {
  Box,
  useTheme,
  Text,
  RoundedIconButton,
  Header,
} from "../../components";
import {
  CommonActions,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";

export const assets = [require("./assets/drawer.png")];

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.68;
const aspectRatio = 750 / 1500;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Favorite Outfits",
    screen: "FavoriteOutfits",
    color: "drawer1",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "drawer2",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "drawer3",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "Settings",
    color: "drawer4",
  },
  {
    icon: "log-out",
    label: "Logout",
    onPress: (navigation) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      );
    },
    color: "secondary",
  },
];

const Drawer = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          justifyContent="space-between"
          backgroundColor="secondary"
        >
          <Header
            title="Menu"
            left={{
              icon: "x",
              onPress: () =>
                navigation.dispatch(
                  DrawerActions.closeDrawer()
                ),
            }}
            right={{
              icon: "shopping-bag",
              onPress: () => navigation.navigate("Cart"),
            }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="background"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
          />
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              Mike Peter
            </Text>
            <Text variant="body" textAlign="center">
              mike@example.com
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="background"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.61}
      >
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
