import React from "react";
import { Feather as Icon } from "@expo/vector-icons";

import {
  Box,
  Text,
  Container,
  RoundedIconButton,
  RoundedIcon,
  Button,
} from "../components";
import { AuthNavigationProps } from "../components/Navigation";

const SIZE = 80;

const PasswordChanged = ({
  navigation,
}: AuthNavigationProps<"PasswordChanged">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <RoundedIconButton
            backgroundColor="background"
            color="secondary"
            name="x"
            size={60}
            onPress={() => navigation.pop()}
          />
        </Box>
      }
    >
      <Box alignItems="center">
        <RoundedIcon
          name="check"
          size={SIZE}
          backgroundColor="primaryLight"
          color="primary"
        />
        <Text
          variant="title1"
          textAlign="center"
          marginVertical="l"
        >
          Your password was successfully changed
        </Text>
        <Text
          variant="body"
          textAlign="center"
          marginBottom="l"
        >
          Close this window and login again
        </Text>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={() => navigation.navigate("Login")}
            label="Reset Password"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordChanged;
