import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {useTheme} from "@shopify/restyle"

interface ButtonProps {
  variant: "default" | "primary";
  label: string;
  onPress: () => void;
}

const Button = ({
  variant,
  label,
  onPress,
}: ButtonProps) => {
  const theme = useTheme<Theme>();
  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : theme.colors.body;
  const color = variant === "primary" ? theme.colors.white : theme.colors.text;
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = { variant: "default" };

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 185,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    //Update font
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Button;
