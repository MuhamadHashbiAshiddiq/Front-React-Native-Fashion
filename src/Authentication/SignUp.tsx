import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextInput from "../components/Form/TextInput";
import Footer from "./components/Footer";

import {
  Container,
  Button,
  Text,
  Box,
} from "../components";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../components/Navigation";

const SignUpSchema = Yup.object().shape({
  passwordConfirmation: Yup.string()
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
}: StackNavigationProps<AuthenticationRoutes, "SignUp">) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => console.log(values),
  });

  const password = useRef<typeof TextInput>(null);
  const passwordConfirmation =
    useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <Container pattern={1} {...{ footer }}>
      <Box padding="xl">
        <Text
          variant="title1"
          textAlign="center"
          marginBottom="l"
        >
          Create account
        </Text>
        <Text
          variant="body"
          textAlign="center"
          marginBottom="l"
        >
          Let's us know what your name, email, and your
          password
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

          <Box marginBottom="m">
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
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmit={() =>
                passwordConfirmation.current?.focus()
              }
              secureTextEntry
            />
          </Box>

          <Box marginBottom="m">
            <TextInput
              ref={passwordConfirmation}
              icon="lock"
              placeholder="Confirm your password"
              onChangeText={handleChange(
                "passwordConfirmation"
              )}
              onBlur={handleBlur("passwordConfirmation")}
              error={errors.passwordConfirmation}
              touched={touched.passwordConfirmation}
              autoCompleteType="password"
              autoCapitalize="none"
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmit={() => handleSubmit()}
              secureTextEntry
            />
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

export default SignUp;
