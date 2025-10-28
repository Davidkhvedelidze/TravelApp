import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../store/FavoritesContext";
import { colors } from "../theme/colors";

export interface FavoriteButtonProps {
  tourId: string;
  size?: number;
  style?: ViewStyle;
}

export function FavoriteButton({
  tourId,
  size = 22,
  style,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tourId);

  return (
    <Pressable
      onPress={() => toggleFavorite(tourId)}
      style={({ pressed }) => [
        styles.base,
        favorite ? styles.active : null,
        pressed ? styles.pressed : null,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={
        favorite ? "Remove from saved tours" : "Save tour to favorites"
      }
      accessibilityHint="Toggles whether this tour is saved"
    >
      <Ionicons
        name={favorite ? "heart" : "heart-outline"}
        size={size}
        color={favorite ? colors.brandDark : colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  active: {
    borderColor: colors.brand,
    backgroundColor: colors.brandLight,
  },
  pressed: {
    opacity: 0.7,
  },
});
