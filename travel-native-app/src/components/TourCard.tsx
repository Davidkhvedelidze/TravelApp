import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { FavoriteButton } from "./FavoriteButton";
import { colors } from "../theme/colors";
import { Tour } from "../data/tours";

export interface TourCardProps {
  tour: Tour;
  onPress?: () => void;
}

export function TourCard({ tour, onPress }: TourCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.cardPressed : null,
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: tour.heroImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tour.theme}</Text>
          </View>
          <View style={styles.badgeMuted}>
            <Text style={styles.badgeMutedText}>{tour.duration}</Text>
          </View>
        </View>
        <FavoriteButton tourId={tour.id} style={styles.favoriteButton} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{tour.title}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {tour.description}
        </Text>
        <View style={styles.highlights}>
          {tour.highlights.slice(0, 3).map((highlight) => (
            <View key={highlight} style={styles.highlightPill}>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{tour.price}</Text>
          <Text style={styles.cta}>View details →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  imageWrapper: {
    position: "relative",
    height: 200,
    backgroundColor: colors.mutedSurface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badgeRow: {
    position: "absolute",
    left: 18,
    bottom: 18,
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  badgeMuted: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeMutedText: {
    color: "#E2E8F0",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: "absolute",
    right: 18,
    top: 18,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  highlights: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  highlightPill: {
    backgroundColor: colors.mutedSurface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  highlightText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.brandDark,
  },
  cta: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brand,
  },
});
