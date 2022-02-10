import React from "react";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import {
  Box,
  Text,
  Theme,
  useTheme,
} from "../../components/Theme";
import { RoundedIcon } from "../../components";
import { HomeRoutes } from "../../components/Navigation";

interface BaseDrawerItem {
  icon: string;
  label: string;
  color: keyof Theme["colors"];
}

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (
    navigation: ReturnType<typeof useNavigation>
  ) => void;
}

export type DrawerItemProps =
  | ScreenDrawerItem
  | OnPressDrawerItem;

const DrawerItem = ({
  icon,
  color,
  label,
  ...props
}: DrawerItemProps) => {
  const theme = useTheme();
  const navigation =
    useNavigation<
      DrawerNavigationProp<HomeRoutes, "OutfitIdeas">
    >();

  return (
    <RectButton
      onPress={() =>
        props.screen
          ? navigation.navigate(props.screen)
          : props.onPress(navigation)
      }
      style={{ borderRadius: theme.borderRadii.m }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        padding="m"
      >
        <RoundedIcon
          iconRatio={0.5}
          name={icon}
          size={36}
          backgroundColor={color}
          color={"white"}
        />
        <Text
          variant="button"
          color="secondary"
          marginLeft="m"
        >
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
