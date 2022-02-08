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

export interface DrawerItemProps {
  icon: string;
  label: string;
  screen: keyof HomeRoutes;
  color: keyof Theme["colors"];
}

const DrawerItem = ({
  icon,
  color,
  screen,
  label,
}: DrawerItemProps) => {
  const theme = useTheme();
  const { navigate } =
    useNavigation<
      DrawerNavigationProp<HomeRoutes, "OutfitIdeas">
    >();

  return (
    <RectButton
      onPress={() => navigate(screen)}
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
