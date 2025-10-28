import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  PressableProps,
  StyleProp,
} from "react-native";
import { colors } from "../theme/colors";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.base,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : undefined,
    style,
  ];

  const textStyle: StyleProp<TextStyle> = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled ? styles.disabledText : undefined,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyle,
        pressed && !disabled ? styles.pressed : undefined,
      ]}
      {...props}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.brand,
  },
  secondary: {
    backgroundColor: "rgba(248, 250, 252, 0.9)",
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.brand,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: colors.brandDark,
  },
  outlineText: {
    color: colors.brand,
  },
  ghostText: {
    color: colors.brand,
  },
  smallText: {
    fontSize: 13,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  disabledText: {
    opacity: 0.7,
  },
});
