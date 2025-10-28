import React, { JSX } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useNavigation, NavigatorScreenParams } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BrandMark } from "../components/BrandMark";
import { SectionHeader } from "../components/SectionHeader";
import { TourCard } from "../components/TourCard";
import { BlogCard } from "../components/BlogCard";
import { colors } from "../theme/colors";
import { tours, Tour } from "../data/tours";
import { blogPosts, BlogPost } from "../data/blog";

const heroImage =
  "https://images.unsplash.com/photo-1541849549-216549ae2161?auto=format&fit=crop&w=1200&q=80";

type ToursStackParamList = {
  ToursList: undefined;
  TourDetail: { slug: string };
};

type BlogStackParamList = {
  BlogList: undefined;
  BlogPost: { slug: string };
};

type RootTabParamList = {
  Home: undefined;
  Tours: NavigatorScreenParams<ToursStackParamList>;
  Blog: NavigatorScreenParams<BlogStackParamList>;
  Contact: undefined;
};

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
  const topTours: Tour[] = tours.slice(0, 3);
  const topPosts: BlogPost[] = blogPosts.slice(0, 2);

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <ImageBackground
          source={{ uri: heroImage }}
          imageStyle={styles.heroImage}
          style={styles.heroContent}
        >
          <View style={styles.heroOverlay} />
          <View style={styles.heroInner}>
            <BrandMark size="lg" />
            <Text style={styles.heroTitle}>
              Unlock soulful adventures crafted across Georgia.
            </Text>
            <Text style={styles.heroSubtitle}>
              Boutique curators pairing landmark highlights with rare
              encounters, private hosts, and modern comfort.
            </Text>
            <View style={styles.heroActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed ? styles.primaryButtonPressed : null,
                ]}
                onPress={() =>
                  navigation.navigate("Tours", { screen: "ToursList" })
                }
              >
                <Text style={styles.primaryButtonLabel}>
                  Explore signature tours
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed ? styles.secondaryButtonPressed : null,
                ]}
                onPress={() => navigation.navigate("Contact" as never)}
              >
                <Text style={styles.secondaryButtonLabel}>
                  Consult a curator
                </Text>
              </Pressable>
            </View>
            <View style={styles.heroStats}>
              {[
                { label: "Handcrafted itineraries", value: "120+" },
                { label: "Trusted local hosts", value: "65" },
                { label: "Five-star reviews", value: "2.4k" },
              ].map((stat) => (
                <View key={stat.label} style={styles.statCard}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="Why travel with us"
          title="Slow travel curators who unlock private rituals"
          description="Our hosts and artisans welcome you into ateliers, vineyards, and sacred landscapes. Every itinerary honors Georgian heritage while celebrating design-forward comfort."
        />
        <View style={styles.valueGrid}>
          {[
            {
              title: "Boutique stays",
              description:
                "Design-led hotels, vineyard estates, and alpine lodges curated for comfort and character.",
            },
            {
              title: "Culinary storytelling",
              description:
                "Private supra feasts, chef collaborations, and vineyard lunches with tamadas.",
            },
            {
              title: "Slow travel experts",
              description:
                "Balanced pacing with wellness rituals, cultural workshops, and time to breathe.",
            },
          ].map((item) => (
            <View key={item.title} style={styles.valueCard}>
              <Text style={styles.valueTitle}>{item.title}</Text>
              <Text style={styles.valueDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="Signature journeys"
          title="Crafted itineraries across Georgia"
          description="Preview a selection of curated experiences, then tailor every moment with our travel designers."
        />
        {topTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onPress={() =>
              navigation.navigate("Tours", {
                screen: "TourDetail",
                params: { slug: tour.slug },
              })
            }
          />
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.moreLink,
            pressed ? styles.moreLinkPressed : null,
          ]}
          onPress={() => navigation.navigate("Tours", { screen: "ToursList" })}
        >
          <Text style={styles.moreLinkLabel}>View all journeys →</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow="Journal"
          title="Stories from the road"
          description="Insights from our curators featuring culinary rituals, alpine adventures, and wellness residencies."
        />
        {topPosts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            onPress={() =>
              navigation.navigate("Blog", {
                screen: "BlogPost",
                params: { slug: post.slug },
              })
            }
          />
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.moreLink,
            pressed ? styles.moreLinkPressed : null,
          ]}
          onPress={() => navigation.navigate("Blog", { screen: "BlogList" })}
        >
          <Text style={styles.moreLinkLabel}>Visit the journal →</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  heroContent: {
    borderRadius: 36,
    overflow: "hidden",
    minHeight: 520,
    justifyContent: "flex-end",
  },
  heroImage: {
    borderRadius: 36,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.35)",
  },
  heroInner: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 16,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    color: "#fff",
  },
  heroSubtitle: {
    color: "#F8FAFC",
    fontSize: 16,
    lineHeight: 22,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonLabel: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  secondaryButton: {
    backgroundColor: "rgba(248, 250, 252, 0.9)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  secondaryButtonPressed: {
    opacity: 0.9,
  },
  secondaryButtonLabel: {
    color: colors.brandDark,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  heroStats: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 8,
  },
  statCard: {
    flexBasis: "30%",
    backgroundColor: "rgba(248,248,246,0.85)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.brandDark,
  },
  statLabel: {
    marginTop: 4,
    color: "#1F2937",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 18,
  },
  valueGrid: {
    gap: 14,
  },
  valueCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  valueDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  moreLink: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  moreLinkPressed: {
    backgroundColor: colors.brandLight,
  },
  moreLinkLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brandDark,
  },
});
