import React, { useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  CommonActions,
  CompositeNavigationProp,
  StackActions,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";

import Footer from "./components/Footer";

import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";
import {
  Container,
  Button,
  Text,
  Box,
} from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import api, { baseUrlAxios } from "../utils/api";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const Login = ({
  navigation,
}: AuthNavigationProps<"Login">) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(
        2,
        "Password length should be at least 4 characters"
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
  });

  const login = async () => {
    // console.log(email, password);
    try {
      const res = await api
        .post("login", { email, password })
        .then(() => {
          navigation.dispatch(StackActions.replace("Home"));
        });
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      // alert(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    login();
  }, []);

  const password = useRef<RNTextInput>(null);

  const footer = (
    <Footer
      title="Dont have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );
  return (
    <Container pattern={2} footer={footer}>
      <Box padding="l">
        <Text
          variant="title1"
          textAlign="center"
          marginBottom="m"
        >
          Welcome Back
        </Text>
        <Text
          textAlign="center"
          variant="body"
          marginBottom="l"
        >
          Use your credentials below to login to your
          account
        </Text>

        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, onBlur },
          }) => {
            return (
              <TextInput
                icon="mail"
                placeholder="Enter your Email"
                autoCompleteType="email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.email}
                errorMessage={errors?.email?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, onBlur },
          }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Enter your Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.password}
                errorMessage={errors?.password?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />

        <Controller
          control={control}
          name="rememberMe"
          render={({
            field: { onChange, value, onBlur },
          }) => {
            const rememberMe = (data: boolean) =>
              onChange(data);
            return (
              <Box
                flexDirection="row"
                justifyContent="space-between"
                paddingVertical="m"
              >
                {/* <Checkbox label="Remeber me" hookFormData={rememberMe} /> */}

                <BorderlessButton
                  rippleColor="rgba(0,0,0,0)"
                  onPress={() =>
                    navigation.navigate("ForgotPassword")
                  }
                >
                  <Text color="primary">
                    Forgot Password?
                  </Text>
                </BorderlessButton>
              </Box>
            );
          }}
        />

        {error && (
          <Text color="danger">Invalid Credentials</Text>
        )}

        <Box alignItems="center" marginTop="m">
          <Button
            isLoading={isLoading}
            variant="primary"
            label="Log In"
            onPress={handleSubmit(login)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
