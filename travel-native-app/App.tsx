import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { FavoritesProvider } from "./src/store/FavoritesContext";
import { TabNavigator } from "./src/navigation/TabNavigator";

export default function App(): JSX.Element {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <TabNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
