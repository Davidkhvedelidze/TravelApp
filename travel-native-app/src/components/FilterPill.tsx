import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  PressableProps,
} from "react-native";
import { colors } from "../theme/colors";

export interface FilterPillProps extends Omit<PressableProps, "style"> {
  label: string;
  isActive: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function FilterPill({
  label,
  isActive,
  onPress,
  style,
  ...props
}: FilterPillProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        isActive && styles.pillActive,
        pressed && styles.pillPressed,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.pillLabel, isActive && styles.pillLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surface,
  },
  pillActive: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brand,
  },
  pillPressed: {
    opacity: 0.85,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  pillLabelActive: {
    color: colors.brandDark,
  },
});
