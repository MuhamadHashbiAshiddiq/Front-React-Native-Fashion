import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";
import Footer from "./components/Footer";

import {
  Container,
  Button,
  Text,
  Box,
} from "../components";
import {
  Routes,
  StackNavigationProps,
} from "../components/Navigation";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});

const Login = ({
  navigation,
}: StackNavigationProps<Routes, "Login">) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    onSubmit: (values) => console.log(values),
  });

  const password = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Dont have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  return (
    <Container pattern={0} {...{ footer }}>
      <Box padding="xl">
        <Text
          variant="title1"
          textAlign="center"
          marginBottom="l"
        >
          Welcome back
        </Text>
        <Text
          variant="body"
          textAlign="center"
          marginBottom="l"
        >
          Use your credentials below and login to your
          account
        </Text>

        <Box>
          <Box marginBottom="m">
            <TextInput
              icon="mail"
              placeholder="Enter your email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              autoCapitalize="none"
              autoCompleteType="email"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() =>
                password.current?.focus()
              }
            />
          </Box>

          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmit={() => handleSubmit()}
            secureTextEntry
          />

          <Box
            flexDirection="row"
            justifyContent="space-between"
          >
            <Checkbox
              label="Remember me"
              checked={values.remember}
              onChange={() =>
                setFieldValue("remember", !values.remember)
              }
            />
            <Button
              variant="transparent"
              onPress={() =>
                navigation.navigate("ForgotPassword")
              }
            >
              <Text color="primary">Forget Password?</Text>
            </Button>
          </Box>

          <Box alignItems="center" marginTop="m">
            <Button
              variant="primary"
              onPress={handleSubmit}
              label="Log into your account"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
