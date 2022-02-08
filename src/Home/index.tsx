import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";

import FavoriteOutfits from "./FavoriteOutfits";
import { HomeRoutes } from "../components/Navigation";

export { assets } from "./Drawer";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={() => <DrawerContent />}
    drawerStyle={{ width: DRAWER_WIDTH }}
  >
    <Drawer.Screen
      name="OutfitIdeas"
      component={OutfitIdeas}
    />
    <Drawer.Screen
      name="FavoriteOutfits"
      component={FavoriteOutfits}
    />
  </Drawer.Navigator>
);
