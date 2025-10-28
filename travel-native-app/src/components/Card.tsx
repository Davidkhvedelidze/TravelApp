import React, { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  PressableProps,
} from "react-native";
import { colors } from "../theme/colors";

export type CardVariant = "default" | "compact" | "spacious" | "elevated";

export interface CardProps extends Omit<PressableProps, "style"> {
  children: ReactNode;
  onPress?: () => void;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
}

export function Card({
  children,
  onPress,
  variant = "default",
  style,
  ...props
}: CardProps) {
  const cardStyle: StyleProp<ViewStyle> = [
    styles.base,
    styles[variant],
    onPress ? styles.pressable : undefined,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          cardStyle as any,
          pressed ? styles.pressed : undefined,
        ]}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  default: {
    padding: 20,
  },
  compact: {
    padding: 16,
  },
  spacious: {
    padding: 24,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pressable: {
    // Additional styles for pressable cards
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
});
