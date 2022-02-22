import React, { ReactNode } from "react";
import { BoxProps } from "@shopify/restyle";
import { BorderlessButton } from "react-native-gesture-handler";

import { Box, Theme } from "../../components/Theme";

export const CARD_HEIGHT = 160;

interface CardLayoutProps {
  children: ReactNode;
  onPress: () => void;
  backgroundColor: BoxProps<Theme>["backgroundColor"];
}

const CardLayout = ({
  children,
  onPress,
  backgroundColor,
}: CardLayoutProps) => {
  return (
    <BorderlessButton onPress={onPress}>
      <Box
        padding="m"
        marginLeft="m"
        borderRadius="m"
        width={120}
        height={120}
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>
    </BorderlessButton>
  );
};

export default CardLayout;
