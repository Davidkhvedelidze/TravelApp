import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { blogPosts, BlogPost } from "../data/blog";
import { colors } from "../theme/colors";

interface RouteParams {
  slug: string;
}

export default function BlogPostScreen() {
  const route = useRoute();
  const { slug } = (route.params as RouteParams) ?? {};

  const post = useMemo(
    () => blogPosts.find((item) => item.slug === slug),
    [slug]
  );

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.heroImage} />
      <View style={styles.content}>
        <View style={styles.meta}>
          <Text style={styles.category}>{post.category}</Text>
          <Text style={styles.date}>{post.date}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.excerpt}>{post.excerpt}</Text>
        <View style={styles.authorInfo}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.authorTitle}>{post.authorTitle}</Text>
        </View>
        <Text style={styles.readTime}>{post.readTime}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
    gap: 16,
  },
  meta: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: colors.brand,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    color: colors.textPrimary,
  },
  excerpt: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  authorInfo: {
    gap: 4,
  },
  author: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  authorTitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  readTime: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});
