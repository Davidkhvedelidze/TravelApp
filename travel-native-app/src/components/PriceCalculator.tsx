import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../theme/colors";
import { Tour } from "../data/tours";

interface PricingTier {
  label: string;
  window: string;
  options: {
    standard: PricingOption;
    premium: PricingOption;
    luxury: PricingOption;
  };
}

interface PricingOption {
  name: string;
  multiplier: number;
  description: string;
}

interface PriceCalculatorProps {
  tour: Tour;
}

const pricingTiers: Record<string, PricingTier> = {
  peak: {
    label: "Peak season",
    window: "June — August",
    options: {
      standard: {
        name: "Peak standard",
        multiplier: 1,
        description: "Boutique hotels & guesthouses",
      },
      premium: {
        name: "Peak premium",
        multiplier: 1.4,
        description: "Design hotels & wine estates",
      },
      luxury: {
        name: "Peak luxury",
        multiplier: 1.8,
        description: "5-star resorts & private villas",
      },
    },
  },
  shoulder: {
    label: "Shoulder season",
    window: "April — May, September — October",
    options: {
      standard: {
        name: "Shoulder standard",
        multiplier: 0.8,
        description: "Boutique hotels & guesthouses",
      },
      premium: {
        name: "Shoulder premium",
        multiplier: 1.1,
        description: "Design hotels & wine estates",
      },
      luxury: {
        name: "Shoulder luxury",
        multiplier: 1.4,
        description: "5-star resorts & private villas",
      },
    },
  },
  low: {
    label: "Low season",
    window: "November — March",
    options: {
      standard: {
        name: "Low standard",
        multiplier: 0.6,
        description: "Boutique hotels & guesthouses",
      },
      premium: {
        name: "Low premium",
        multiplier: 0.8,
        description: "Design hotels & wine estates",
      },
      luxury: {
        name: "Low luxury",
        multiplier: 1.0,
        description: "5-star resorts & private villas",
      },
    },
  },
};

export function PriceCalculator({ tour }: PriceCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<string>("peak");
  const [selectedOption, setSelectedOption] = useState<string>("standard");
  const [groupSize, setGroupSize] = useState<string>("2");

  const basePrice = useMemo(() => {
    // Extract base price from tour.price string (e.g., "From $1,280" -> 1280)
    const match = tour.price.match(/\$([0-9,]+)/);
    return match ? parseInt(match[1].replace(/,/g, "")) : 1000;
  }, [tour.price]);

  const calculatedPrice = useMemo(() => {
    const tier = pricingTiers[selectedTier];
    const option = tier.options[selectedOption as keyof typeof tier.options];
    const size = parseInt(groupSize) || 2;

    const pricePerPerson = basePrice * option.multiplier;
    const totalPrice = pricePerPerson * size;

    return {
      perPerson: pricePerPerson,
      total: totalPrice,
      breakdown: {
        base: basePrice,
        multiplier: option.multiplier,
        size,
      },
    };
  }, [basePrice, selectedTier, selectedOption, groupSize]);

  useEffect(() => {
    // Reset option when tier changes
    setSelectedOption("standard");
  }, [selectedTier]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Calculator</Text>
      <Text style={styles.subtitle}>
        Estimate your investment based on season and accommodation level
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Season</Text>
        <View style={styles.tierGrid}>
          {Object.entries(pricingTiers).map(([key, tier]) => (
            <Pressable
              key={key}
              onPress={() => setSelectedTier(key)}
              style={[
                styles.tierButton,
                selectedTier === key && styles.tierButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.tierButtonText,
                  selectedTier === key && styles.tierButtonTextSelected,
                ]}
              >
                {tier.label}
              </Text>
              <Text
                style={[
                  styles.tierButtonSubtext,
                  selectedTier === key && styles.tierButtonSubtextSelected,
                ]}
              >
                {tier.window}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accommodation Level</Text>
        <View style={styles.optionGrid}>
          {Object.entries(pricingTiers[selectedTier].options).map(
            ([key, option]) => (
              <Pressable
                key={key}
                onPress={() => setSelectedOption(key)}
                style={[
                  styles.optionButton,
                  selectedOption === key && styles.optionButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedOption === key && styles.optionButtonTextSelected,
                  ]}
                >
                  {option.name}
                </Text>
                <Text
                  style={[
                    styles.optionButtonDescription,
                    selectedOption === key &&
                      styles.optionButtonDescriptionSelected,
                  ]}
                >
                  {option.description}
                </Text>
              </Pressable>
            )
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group Size</Text>
        <TextInput
          value={groupSize}
          onChangeText={setGroupSize}
          keyboardType="numeric"
          style={styles.groupSizeInput}
          placeholder="2"
        />
      </View>

      <View style={styles.priceSection}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Per person</Text>
          <Text style={styles.priceValue}>
            ${calculatedPrice.perPerson.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total for {groupSize} people</Text>
          <Text style={styles.priceTotal}>
            ${calculatedPrice.total.toLocaleString()}
          </Text>
        </View>
        <Text style={styles.priceNote}>
          Prices include accommodation, meals, activities, and local guides.
          International flights not included.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tierGrid: {
    gap: 8,
  },
  tierButton: {
    backgroundColor: colors.mutedSurface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tierButtonSelected: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brand,
  },
  tierButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  tierButtonTextSelected: {
    color: colors.brandDark,
  },
  tierButtonSubtext: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  tierButtonSubtextSelected: {
    color: colors.brandDark,
  },
  optionGrid: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: colors.mutedSurface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    backgroundColor: colors.brandLight,
    borderColor: colors.brand,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  optionButtonTextSelected: {
    color: colors.brandDark,
  },
  optionButtonDescription: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  optionButtonDescriptionSelected: {
    color: colors.brandDark,
  },
  groupSizeInput: {
    backgroundColor: colors.mutedSurface,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceSection: {
    backgroundColor: colors.mutedSurface,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  priceTotal: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.brandDark,
  },
  priceNote: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
    marginTop: 8,
  },
});
