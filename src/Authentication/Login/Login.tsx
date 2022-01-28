import React from "react";
import { View } from "react-native";

import SocialLogin from "../components/SocialLogin"

import { Container } from "../../components";

const Login = () => {
  return (
    <Container footer={<SocialLogin />}>
      <View />
    </Container>
  );
};

export default Login;
