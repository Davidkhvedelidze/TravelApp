import React, { JSX, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { tours, Tour } from "../data/tours";
import { colors } from "../theme/colors";
import { FavoriteButton } from "../components/FavoriteButton";
import { Calendar } from "../components/Calendar";
import { PriceCalculator } from "../components/PriceCalculator";
import { SectionHeader } from "../components/SectionHeader";

interface RouteParams {
  slug: string;
}

interface FormData {
  name: string;
  email: string;
  interests: string;
}

interface MetaCardProps {
  label: string;
  value: string;
  accent?: boolean;
}

interface PressableButtonProps {
  label: string;
  onPress: () => void;
}

export default function TourDetailScreen(): JSX.Element {
  const route = useRoute();
  const { slug } = (route.params as RouteParams) ?? {};
  const tour = useMemo(() => tours.find((item) => item.slug === slug), [slug]);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    interests: "",
  });

  if (!tour) {
    return (
      <View style={styles.missingContainer}>
        <Text style={styles.missingTitle}>Journey unavailable</Text>
        <Text style={styles.missingDescription}>
          We could not locate the requested itinerary. Please return to the
          tours list.
        </Text>
      </View>
    );
  }

  const handleSubmit = (): void => {
    Alert.alert(
      "Request received",
      "Our travel concierge will be in touch shortly with tailored details."
    );
    setForm({ name: "", email: "", interests: "" });
  };

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <Image
          source={{ uri: tour.heroImage }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroBadgeRow}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>{tour.theme}</Text>
          </View>
          <View style={styles.heroBadgeSecondary}>
            <Text style={styles.heroBadgeSecondaryLabel}>{tour.duration}</Text>
          </View>
          <FavoriteButton tourId={tour.id} style={styles.heroFavorite} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          eyebrow={tour.region}
          title={tour.title}
          description={tour.description}
        />
        <View style={styles.metaGrid}>
          <MetaCard label="Duration" value={tour.duration} />
          <MetaCard label="Region" value={tour.region} />
          <MetaCard label="Investment" value={tour.price} accent />
        </View>
      </View>

      <View style={styles.gallery}>
        {tour.gallery.map((image) => (
          <Image
            key={image}
            source={{ uri: image }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Highlights"
          description="Curated experiences woven throughout the itinerary."
        />
        <View style={styles.highlightGrid}>
          {tour.highlights.map((highlight) => (
            <View key={highlight} style={styles.highlightCard}>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Day-by-day journey"
          description="Every day is balanced with discovery and restoration. Timings adapt to your pace."
        />
        <View style={styles.itinerary}>
          {tour.itinerary.map((day) => (
            <View key={day.day} style={styles.itineraryCard}>
              <View style={styles.itineraryHeader}>
                <Text style={styles.dayLabel}>{day.day}</Text>
                <Text style={styles.dayTitle}>{day.title}</Text>
              </View>
              <Text style={styles.dayDetails}>{day.details}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Plan your journey"
          description="Confirm availability, estimate investment, and share your travel aspirations."
        />
        <View style={styles.planningGrid}>
          <Calendar onDateSelect={(range: Date[]) => setSelectedDates(range)} />
          <PriceCalculator tour={tour} />
        </View>
      </View>

      <View style={[styles.section, styles.sectionLast]}>
        <SectionHeader
          title="Reserve with our concierge"
          description="Share your preferred dates, group size, and interests. We respond within one business day with a bespoke proposal."
        />
        <View style={styles.form}>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              value={form.name}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, name: value }))
              }
              placeholder="Your full name"
              style={styles.input}
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={form.email}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
              placeholder="you@example.com"
              keyboardType="email-address"
              style={styles.input}
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Interests</Text>
            <TextInput
              value={form.interests}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, interests: value }))
              }
              placeholder="Wine, architecture, wellness, adventure..."
              style={[styles.input, styles.inputMultiline]}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          {selectedDates.length === 2 ? (
            <View style={styles.selectedDateBadge}>
              <Text style={styles.selectedDateText}>
                Selected stay: {selectedDates[0].toLocaleDateString()} →{" "}
                {selectedDates[1].toLocaleDateString()}
              </Text>
            </View>
          ) : null}
          <Text style={styles.privacyNote}>
            We respect your inbox. Details are used solely to design your
            journey.
          </Text>
          <PressableButton label="Request details" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

function MetaCard({ label, value, accent }: MetaCardProps): JSX.Element {
  return (
    <View style={[styles.metaCard, accent ? styles.metaAccent : null]}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={[styles.metaValue, accent ? styles.metaValueAccent : null]}>
        {value}
      </Text>
    </View>
  );
}

function PressableButton({
  label,
  onPress,
}: PressableButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.submitButton,
        pressed ? styles.submitButtonPressed : null,
      ]}
    >
      <Text style={styles.submitButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    margin: 20,
    borderRadius: 36,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 3,
  },
  heroImage: {
    width: "100%",
    height: 280,
  },
  heroBadgeRow: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroBadge: {
    backgroundColor: colors.brand,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeLabel: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  heroBadgeSecondary: {
    backgroundColor: "rgba(15,23,42,0.75)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeSecondaryLabel: {
    color: "#E2E8F0",
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  heroFavorite: {
    marginLeft: "auto",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 18,
  },
  sectionLast: {
    paddingBottom: 48,
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  metaCard: {
    flexBasis: "48%",
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  metaAccent: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brand,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  metaValueAccent: {
    color: colors.brandDark,
  },
  gallery: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
  },
  galleryImage: {
    flex: 1,
    height: 160,
    borderRadius: 24,
  },
  highlightGrid: {
    gap: 10,
  },
  highlightCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlightText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  itinerary: {
    gap: 12,
  },
  itineraryCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 8,
  },
  itineraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "700",
    color: colors.brandDark,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    flex: 1,
    textAlign: "right",
    marginLeft: 12,
  },
  dayDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  planningGrid: {
    gap: 20,
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 22,
    gap: 16,
  },
  inputBlock: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: colors.textMuted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  inputMultiline: {
    minHeight: 120,
  },
  selectedDateBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandLight,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  selectedDateText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.brandDark,
  },
  privacyNote: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonPressed: {
    opacity: 0.92,
  },
  submitButtonLabel: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  missingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    backgroundColor: colors.background,
  },
  missingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  missingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
