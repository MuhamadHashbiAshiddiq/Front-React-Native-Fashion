import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";

import { HomeRoutes } from "../components/Navigation";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    drawerStyle={{ width: DRAWER_WIDTH }}
  >
    <Drawer.Screen
      name="OutfitIdeas"
      component={OutfitIdeas}
    />
  </Drawer.Navigator>
);
