import React from "react";
import { StyleSheet, Text, View, TextStyle } from "react-native";
import { colors } from "../theme/colors";

export type TabIconName = "home" | "tours" | "blog" | "contact";

export interface TabBarIconProps {
  name: TabIconName;
  focused: boolean;
  size?: number;
}

export function TabBarIcon({ name, focused, size = 24 }: TabBarIconProps) {
  const iconStyle: TextStyle[] = [
    styles.icon,
    { fontSize: size },
    focused ? styles.iconFocused : styles.iconUnfocused,
  ];

  return (
    <View style={styles.container}>
      <Text style={iconStyle}>{getIcon(name)}</Text>
    </View>
  );
}

function getIcon(name: TabIconName): string {
  const icons: Record<TabIconName, string> = {
    home: "🏠",
    tours: "🗺️",
    blog: "📝",
    contact: "📞",
  };
  return icons[name] || "❓";
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontWeight: "400",
  },
  iconFocused: {
    opacity: 1,
  },
  iconUnfocused: {
    opacity: 0.6,
  },
});
