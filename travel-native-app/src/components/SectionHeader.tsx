import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

export type TextAlign = "left" | "center";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: TextAlign;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, align === "center" ? styles.center : null]}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  center: {
    alignItems: "center",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.brandDark,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
});
