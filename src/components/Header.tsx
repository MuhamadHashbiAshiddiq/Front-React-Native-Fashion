import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import RoundedIconButton from "./RoundedIconButton";
import { Box, Text } from "./Theme";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right: {
    icon: string;
    onPress: () => void;
  };
}

const Header = ({ title, right, left }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Box
      flexDirection="row"
      style={{ marginTop: insets.top }}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <RoundedIconButton
        size={24}
        name={left.icon}
        name="x"
        color="white"
        backgroundColor="secondary"
        omPress={left.onPress}
      />
      <Text variant="header" color="white">
        {title.toUpperCase()}
      </Text>
      <RoundedIconButton
        size={24}
        name={right.icon}
        color="white"
        backgroundColor="secondary"
        omPress={right.onPress}
      />
    </Box>
  );
};

export default Header;
