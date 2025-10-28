import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { BlogPost } from "../data/blog";

export interface BlogCardProps {
  post: BlogPost;
  onPress?: () => void;
}

export function BlogCard({ post, onPress }: BlogCardProps) {
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
          source={{ uri: post.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{post.category}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.meta}>
          {post.date} • {post.readTime}
        </Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.excerpt} numberOfLines={3}>
          {post.excerpt}
        </Text>
        <Text style={styles.cta}>Read story →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
  },
  imageWrapper: {
    height: 180,
    position: "relative",
    backgroundColor: colors.mutedSurface,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    bottom: 14,
    left: 16,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 0.6,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 10,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  excerpt: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  cta: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: colors.brand,
  },
});
