import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useRef } from "react";
import {
  View,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  Animated,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AboutUs = () => {
  const colorScheme = useColorScheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Animation values for each section
  const animationValues = useRef({
    appInfo: new Animated.Value(0),
    mission: new Animated.Value(0),
    features: new Animated.Value(0),
    team: new Animated.Value(0),
  }).current;

  const appVersion = "1.0.0";
  const buildNumber = "2024.01.15";

  const handleContactPress = (type: string) => {
    switch (type) {
      case "email":
        Linking.openURL("mailto:support@bestpractice.app");
        break;
      case "website":
        Linking.openURL("https://bestpractice.app");
        break;
      case "phone":
        Linking.openURL("tel:+1234567890");
        break;
      default:
        Alert.alert("Contact", `Opening ${type}...`);
    }
  };

  const toggleSection = (section: string) => {
    const isCurrentlyExpanded = expandedSection === section;
    const newExpandedSection = isCurrentlyExpanded ? null : section;

    // Configure LayoutAnimation for smooth transitions
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "easeInEaseOut" },
      delete: { type: "easeInEaseOut", property: "opacity" },
    });

    // Animate the chevron rotation
    const targetValue = isCurrentlyExpanded ? 0 : 1;
    Animated.timing(animationValues[section as keyof typeof animationValues], {
      toValue: targetValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setExpandedSection(newExpandedSection);
  };

  // Unified data structure for all sections
  const sectionsData = [
    {
      id: "appInfo",
      title: "App Information",
      type: "info",
      content: [
        { label: "Version:", value: appVersion },
        { label: "Build:", value: buildNumber },
        { label: "Platform:", value: Platform.OS },
        { label: "Framework:", value: "React Native + Expo" },
      ],
    },
    {
      id: "mission",
      title: "Our Mission",
      type: "text",
      content:
        "We are dedicated to creating exceptional mobile experiences that combine cutting-edge technology with intuitive design. Our goal is to provide developers and users with tools that make mobile development more efficient and enjoyable.",
    },
    {
      id: "features",
      title: "Key Features",
      type: "list",
      content: [
        "Modern React Native Architecture",
        "Cross-platform Compatibility",
        "Dark/Light Theme Support",
        "Haptic Feedback",
        "Responsive Design",
        "TypeScript Support",
      ],
    },
    {
      id: "team",
      title: "Our Team",
      type: "team",
      content: [
        {
          name: "John Doe",
          role: "Lead Developer",
          email: "john@bestpractice.app",
        },
        {
          name: "Jane Smith",
          role: "UI/UX Designer",
          email: "jane@bestpractice.app",
        },
        {
          name: "Mike Johnson",
          role: "Product Manager",
          email: "mike@bestpractice.app",
        },
      ],
    },
  ];

  // Animated chevron component
  const AnimatedChevron = ({ section }: { section: string }) => {
    const rotation = animationValues[
      section as keyof typeof animationValues
    ].interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    return (
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <IconSymbol
          name="chevron.down"
          size={20}
          color={Colors[colorScheme ?? "light"].text}
        />
      </Animated.View>
    );
  };

  // Function to render different content types
  const renderSectionContent = (section: (typeof sectionsData)[0]) => {
    const isExpanded = expandedSection === section.id;
    const animationValue =
      animationValues[section.id as keyof typeof animationValues];

    if (!isExpanded) return null;

    const animatedStyle = {
      opacity: animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };

    switch (section.type) {
      case "info":
        const infoContent = section.content as {
          label: string;
          value: string;
        }[];
        return (
          <Animated.View style={[styles.sectionContent, animatedStyle]}>
            {infoContent.map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>{item.label}</ThemedText>
                <ThemedText style={styles.infoValue}>{item.value}</ThemedText>
              </View>
            ))}
          </Animated.View>
        );

      case "text":
        const textContent = section.content as string;
        return (
          <Animated.View style={[styles.sectionContent, animatedStyle]}>
            <ThemedText style={styles.description}>{textContent}</ThemedText>
          </Animated.View>
        );

      case "list":
        const listContent = section.content as string[];
        return (
          <Animated.View style={[styles.sectionContent, animatedStyle]}>
            {listContent.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <IconSymbol
                  name="checkmark.circle.fill"
                  size={16}
                  color={Colors[colorScheme ?? "light"].tint}
                />
                <ThemedText style={styles.featureText}>{feature}</ThemedText>
              </View>
            ))}
          </Animated.View>
        );

      case "team":
        const teamContent = section.content as {
          name: string;
          role: string;
          email: string;
        }[];
        return (
          <Animated.View style={[styles.sectionContent, animatedStyle]}>
            {teamContent.map((member, index) => (
              <View key={index} style={styles.teamMember}>
                <View style={styles.memberInfo}>
                  <ThemedText style={styles.memberName}>
                    {member.name}
                  </ThemedText>
                  <ThemedText style={styles.memberRole}>
                    {member.role}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleContactPress("email")}
                >
                  <IconSymbol
                    name="envelope"
                    size={16}
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          About Best Practice
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Building the future of mobile development
        </ThemedText>
      </ThemedView>

      {/* Dynamic Sections */}
      {sectionsData.map((section) => (
        <ThemedView key={section.id} style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection(section.id)}
          >
            <ThemedText type="subtitle">{section.title}</ThemedText>
            <AnimatedChevron section={section.id} />
          </TouchableOpacity>
          {renderSectionContent(section)}
        </ThemedView>
      ))}

      {/* Contact Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Get in Touch
        </ThemedText>
        <View style={styles.contactButtons}>
          <TouchableOpacity
            style={[
              styles.contactButtonLarge,
              { backgroundColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={() => handleContactPress("email")}
          >
            <IconSymbol name="envelope.fill" size={20} color="white" />
            <ThemedText style={styles.contactButtonText}>Email Us</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactButtonLarge,
              {
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderColor: Colors[colorScheme ?? "light"].tint,
                borderWidth: 1,
              },
            ]}
            onPress={() => handleContactPress("website")}
          >
            <IconSymbol
              name="globe"
              size={20}
              color={Colors[colorScheme ?? "light"].tint}
            />
            <ThemedText
              style={[
                styles.contactButtonText,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              Visit Website
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          © 2024 Best Practice App. All rights reserved.
        </ThemedText>
        <ThemedText style={styles.footerText}>
          Made with ❤️ using React Native & Expo
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
};

export default AboutUs;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 50,
  },
  header: {
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  sectionContent: {
    padding: 16,
  },
  sectionTitle: {
    padding: 16,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  infoLabel: {
    fontWeight: "600",
    opacity: 0.8,
  },
  infoValue: {
    fontWeight: "500",
  },
  description: {
    lineHeight: 24,
    textAlign: "justify",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  featureText: {
    marginLeft: 12,
    flex: 1,
  },
  teamMember: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontWeight: "600",
    fontSize: 16,
  },
  memberRole: {
    opacity: 0.7,
    fontSize: 14,
    marginTop: 2,
  },
  contactButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contactButtonLarge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: width * 0.35,
    justifyContent: "center",
  },
  contactButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    textAlign: "center",
    opacity: 0.6,
    fontSize: 12,
    marginBottom: 4,
  },
});
