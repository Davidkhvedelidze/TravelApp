import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { blogPosts, BlogPost } from "../data/blog";
import { colors } from "../theme/colors";
import { SectionHeader } from "../components/SectionHeader";
import { BlogCard } from "../components/BlogCard";

type BlogStackParamList = {
  BlogList: undefined;
  BlogPost: { slug: string };
};

export default function BlogScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<BlogStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <SectionHeader
          eyebrow="Travel journal"
          title="Field notes from our curators"
          description="Intimate stories from ateliers, vineyards, and alpine lodges. Discover how we craft slow travel experiences in Georgia."
        />
      </View>
      <View style={styles.list}>
        {blogPosts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            onPress={() => navigation.navigate("BlogPost", { slug: post.slug })}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Have a story request?</Text>
        <Text style={styles.footerDescription}>
          Reach out to our editorial team and we&apos;ll share bespoke guides
          that inspire your next journey.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  list: {
    paddingHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 10,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  footerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
