import React from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { Box, useTheme } from "../../../components";

interface TexInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: string;
}

const TextInput = ({
  icon,
  touched,
  error,
  ...props
}: TexInputProps) => {
  const theme = useTheme();
  const SIZE = theme.borderRadii.m * 2;

  const reColor = !touched
    ? "text"
    : error
    ? "danger"
    : "primary";

  const color = theme.colors[reColor];
  return (
    <Box
      flexDirection="row"
      height={48}
      alignItems="center"
      borderRadius="s"
      borderWidth={StyleSheet.hairlineWidth}
      borderColor={reColor}
      padding="s"
    >
      <Box padding="s">
        <Icon name={icon} size={16} {...{ color }} />
      </Box>
      <Box flex={1}>
        <RNTextInput
          defaultValue=""
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          {...props}
        />
      </Box>
      {touched && (
        <Box
          height={SIZE}
          width={SIZE}
          borderRadius="m"
          justifyContent="center"
          alignItems="center"
          backgroundColor={!error ? "primary" : "danger"}
        >
          <Icon
            name={!error ? "check" : "x"}
            color="white"
            size={16}
          />
        </Box>
      )}
    </Box>
  );
};

export default TextInput;
