import React from "react";
import { View, StyleSheet } from "react-native";

import {
  Box,
  ContentFooter,
  Header,
} from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";

import Notification from "./Notification";

const Settings = ({
  navigation,
}: HomeNavigationProps<"Settings">) => {
  return (
    <ContentFooter>
      <Box backgroundColor="background">
        <Header
          left={{
            icon: "menu",
            onPress: () => navigation.openDrawer(),
          }}
          right={{ icon: "share", onPress: () => true }}
          title="Notifications"
        />
        <Box padding="m">
          <Notification
            title="Outfit Ideas"
            description="Receive daily notifications"
          />
          <Notification
            title="Discounts & Sales"
            description="Buy the stuff you love for less"
          />
          <Notification
            title="Stock Notifications"
            description="If the product you comes back in stock"
          />
          <Notification
            title="New Stuff"
            description="Hear it first, wear it first"
          />
        </Box>
      </Box>
    </ContentFooter>
  );
};

export default Settings;
