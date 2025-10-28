import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { SectionHeader } from "../components/SectionHeader";
import { BrandMark } from "../components/BrandMark";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactScreen() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (): void => {
    Alert.alert(
      "Message sent",
      "Our travel concierge will reply within one business day."
    );
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <BrandMark size="lg" />
        <SectionHeader
          title="Design your Georgian journey"
          description="Connect with our concierge team to craft an itinerary that blends iconic landmarks with private local encounters."
        />
      </View>

      <View style={styles.section}>
        <Card>
          <Text style={styles.cardTitle}>Concierge contact</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Email</Text>
            <Text style={styles.cardValue}>hello@mustseegeorgia.com</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Phone</Text>
            <Text style={styles.cardValue}>+995 (0)32 123 4567</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Office</Text>
            <Text style={styles.cardValue}>
              14 Erekle II St, Tbilisi, Georgia
            </Text>
          </View>
          <Text style={styles.cardNote}>
            Visits available by appointment. Virtual consultations offered
            worldwide.
          </Text>
        </Card>
      </View>

      <View style={[styles.section, styles.sectionLast]}>
        <Card>
          <Text style={styles.formTitle}>Share your travel wishes</Text>
          <Input
            label="Name"
            placeholder="Your full name"
            value={form.name}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, name: value }))
            }
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, email: value }))
            }
            keyboardType="email-address"
          />
          <Input
            label="Message"
            placeholder="Describe your ideal travel pace, interests, and timing..."
            value={form.message}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, message: value }))
            }
            multiline
            numberOfLines={5}
          />
          <Text style={styles.privacyNote}>
            We only use your details to coordinate your itinerary. No spam,
            ever.
          </Text>
          <Button
            title="Schedule a consultation"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            style={styles.submitButton}
          />
        </Card>
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
    gap: 16,
  },
  sectionLast: {
    paddingBottom: 48,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  cardRow: {
    gap: 4,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: colors.textMuted,
  },
  cardValue: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  cardNote: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  privacyNote: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
  submitButton: {
    marginTop: 8,
  },
});
