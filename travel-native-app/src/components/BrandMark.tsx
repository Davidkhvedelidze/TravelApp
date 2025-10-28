import React from "react";
import { StyleSheet, Text, View, TextStyle } from "react-native";
import { colors } from "../theme/colors";

export type BrandMarkSize = "sm" | "md" | "lg";

export interface BrandMarkProps {
  size?: BrandMarkSize;
}

export function BrandMark({ size = "md" }: BrandMarkProps) {
  const fontSize = size === "lg" ? 24 : size === "sm" ? 14 : 18;
  const subFontSize = size === "lg" ? 12 : size === "sm" ? 10 : 11;

  return (
    <View style={styles.container}>
      <Text style={[styles.brand, { fontSize }]}>
        Must See <Text style={styles.highlight}>Georgia</Text>
      </Text>
      <Text style={[styles.tagline, { fontSize: subFontSize }]}>
        Tailored cultural journeys
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  brand: {
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  highlight: {
    color: colors.brand,
  },
  tagline: {
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontWeight: "700",
    color: colors.textMuted,
  },
});
