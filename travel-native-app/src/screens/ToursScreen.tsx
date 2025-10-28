import React, { JSX, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { tours, Tour } from "../data/tours";
import { colors } from "../theme/colors";
import { SectionHeader } from "../components/SectionHeader";
import { TourCard } from "../components/TourCard";
import { FilterPill } from "../components/FilterPill";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/Button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type ToursStackParamList = {
  ToursList: undefined;
  TourDetail: { slug: string };
};

export default function ToursScreen(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<ToursStackParamList>>();
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [activeTheme, setActiveTheme] = useState<string>("All");

  const regions = useMemo(() => {
    const unique = new Set(tours.map((tour) => tour.region));
    return ["All", ...Array.from(unique)];
  }, []);

  const themes = useMemo(() => {
    const unique = new Set(tours.map((tour) => tour.theme));
    return ["All", ...Array.from(unique)];
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesRegion =
        activeRegion === "All" || tour.region === activeRegion;
      const matchesTheme = activeTheme === "All" || tour.theme === activeTheme;
      return matchesRegion && matchesTheme;
    });
  }, [activeRegion, activeTheme]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <SectionHeader
          eyebrow="Signature tours"
          title="Georgia itineraries tailored to your pace"
          description="Mix and match experiences across mountains, wine valleys, and the Black Sea coast. Filter journeys that fit your interests, then tailor every detail with our designers."
        />
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by region</Text>
        <View style={styles.filterRow}>
          {regions.map((region) => (
            <FilterPill
              key={region}
              label={region}
              isActive={activeRegion === region}
              onPress={() => setActiveRegion(region)}
            />
          ))}
        </View>

        <Text style={[styles.filterLabel, styles.filterLabelSpacing]}>
          Filter by theme
        </Text>
        <View style={styles.filterRow}>
          {themes.map((theme) => (
            <FilterPill
              key={theme}
              label={theme}
              isActive={activeTheme === theme}
              onPress={() => setActiveTheme(theme)}
            />
          ))}
        </View>
        {(activeRegion !== "All" || activeTheme !== "All") && (
          <Button
            title="Clear filters"
            onPress={() => {
              setActiveRegion("All");
              setActiveTheme("All");
            }}
            variant="ghost"
            size="small"
            style={styles.clearButton}
          />
        )}
      </View>

      <View style={styles.listing}>
        {filteredTours.map((tour) => (
          <TourCard
            key={tour.id}
            tour={tour}
            onPress={() =>
              navigation.navigate("TourDetail", { slug: tour.slug })
            }
          />
        ))}
        {filteredTours.length === 0 ? (
          <EmptyState
            title="No journeys found"
            description="Adjust your filters to discover curated adventures that match your style."
            actionLabel="Reset filters"
            onAction={() => {
              setActiveRegion("All");
              setActiveTheme("All");
            }}
            style={styles.emptyState}
          />
        ) : null}
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
  filterSection: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 32,
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: colors.textPrimary,
    textTransform: "uppercase",
  },
  filterLabelSpacing: {
    marginTop: 6,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  clearButton: {
    alignSelf: "flex-start",
  },
  listing: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    marginTop: 12,
  },
});
