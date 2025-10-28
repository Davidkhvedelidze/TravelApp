import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../theme/colors";
import { TabBarIcon } from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ToursScreen from "../screens/ToursScreen";
import TourDetailScreen from "../screens/TourDetailScreen";
import BlogScreen from "../screens/BlogScreen";
import BlogPostScreen from "../screens/BlogPostScreen";
import ContactScreen from "../screens/ContactScreen";

const Tab = createBottomTabNavigator();

type ToursStackParamList = {
  ToursList: undefined;
  TourDetail: { slug: string };
};

type BlogStackParamList = {
  BlogList: undefined;
  BlogPost: { slug: string };
};

const ToursStackNav = createNativeStackNavigator<ToursStackParamList>();
const BlogStackNav = createNativeStackNavigator<BlogStackParamList>();

function ToursStack() {
  return (
    <ToursStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 16,
        },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <ToursStackNav.Screen
        name="ToursList"
        component={ToursScreen}
        options={{ title: "Signature Tours" }}
      />
      <ToursStackNav.Screen
        name="TourDetail"
        component={TourDetailScreen}
        options={({ route }) => ({
          title: route.params?.slug
            ? formatTitle(route.params.slug)
            : "Tour details",
        })}
      />
    </ToursStackNav.Navigator>
  );
}

function BlogStack() {
  return (
    <BlogStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 16,
        },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <BlogStackNav.Screen
        name="BlogList"
        component={BlogScreen}
        options={{ title: "Travel Journal" }}
      />
      <BlogStackNav.Screen
        name="BlogPost"
        component={BlogPostScreen}
        options={{ title: "Journal Story" }}
      />
    </BlogStackNav.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Tours"
        component={ToursStack}
        options={{
          title: "Tours",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="tours" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={BlogStack}
        options={{
          title: "Journal",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="blog" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: "Contact",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="contact" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function formatTitle(slug: string): string {
  if (!slug) return "Tour details";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
