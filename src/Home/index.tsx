import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import OutfitIdeas from "./OutfitIdeas";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";

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
    <Drawer.Screen
      name="TransactionHistory"
      component={TransactionHistory}
    />
    <Drawer.Screen
      name="EditProfile"
      component={EditProfile}
    />
    <Drawer.Screen name="Settings" component={Settings} />
  </Drawer.Navigator>
);
