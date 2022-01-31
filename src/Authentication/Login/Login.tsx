import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import SocialLogin from "../components/SocialLogin";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";

import {
  Container,
  Button,
  Text,
  Box,
} from "../../components";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
});
const Login = () => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button variant="transparent" onPress={() => true}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              Don't have an account?
            </Text>
            <Text
              marginLeft="s"
              variant="button"
              color="primary"
            >
              Sign up here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );

  return (
    <Container {...{ footer }}>
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

        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Box>
              <Box marginBottom="m">
                <TextInput
                  icon="mail"
                  placeholder="Enter your email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                />
              </Box>
              <TextInput
                icon="lock"
                placeholder="Enter your password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
              />
              <Box
                flexDirection="row"
                justifyContent="space-between"
              >
                <Checkbox label="Remember me." />
                <Button
                  variant="transparent"
                  onPress={() => true}
                >
                  <Text color="primary">
                    Forget Password?
                  </Text>
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
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;