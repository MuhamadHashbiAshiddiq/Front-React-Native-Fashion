import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";
import TextInput from "../components/Form/TextInput";
import Footer from "./components/Footer";

import {
  Container,
  Button,
  Text,
  Box,
} from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { StackActions } from "@react-navigation/native";

const SignUpSchema = Yup.object().shape({
  passwordConfirm: Yup.string()
    .equals([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});

const SignUp = ({
  navigation,
}: AuthNavigationProps<"SignUp">) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(SignUpSchema),
  });

  const signUp = async (data: any) => {
    console.log(data);
    try {
      const res = await api
        .post("register", data)
        .then(() => {
          navigation.dispatch(StackActions.replace("Home"));
        });
      console.log(res);
    } catch (err) {
      setIsLoading(false);
      setError(true);
      alert("Register Failed !!");
    }
  };

  const password = useRef<typeof TextInput>(null);
  const passwordConfirm = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <Container pattern={1} footer={footer}>
      <Box padding="l">
        <Text
          variant="title1"
          textAlign="center"
          marginBottom="m"
        >
          Create Account
        </Text>
        <Text
          textAlign="center"
          variant="body"
          marginBottom="l"
        >
          Let us know what's your name, email, and your
          password
        </Text>

        <Box marginBottom="m">
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
        </Box>

        <Box marginBottom="m">
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
        </Box>

        <Controller
          control={control}
          name="passwordConfirm"
          render={({
            field: { onChange, value, onBlur },
          }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Confirm your password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.passwordConfirm}
                errorMessage={
                  errors?.passwordConfirm?.message
                }
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />

        <Box alignItems="center" marginTop="m">
          <Button
            isLoading={isLoading}
            variant="primary"
            label="Create Your Account"
            onPress={handleSubmit(signUp)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
