import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Onboarding, Welcome } from "./src/Authentication";
import { LoadAssets } from "./src/components";

const AuthenticationStack = createStackNavigator();

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <AuthenticationStack.Screen
        name="Onboarding"
        component={Onboarding}
      />
      <AuthenticationStack.Screen
        name="Welcome"
        component={Welcome}
      />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}
