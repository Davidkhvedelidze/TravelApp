import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ExternalLink } from '@/components/external-link';

const paymentMethods = [
  {
    name: 'PayPal',
    description:
      'Enable fast, trusted checkout experiences with PayPal balance, cards, and Pay Later options.',
    url: 'https://www.paypal.com/us/business/platforms-and-marketplaces',
  },
  {
    name: 'Apple Pay',
    description:
      'Offer a one-tap payment flow for iOS travelers that keeps their card details securely stored in Wallet.',
    url: 'https://developer.apple.com/apple-pay/',
  },
  {
    name: 'Google Pay',
    description:
      'Reach Android users globally with tokenized payments that autofill traveler details.',
    url: 'https://developers.google.com/pay/api',
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Plan Your Next Journey</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.heroCard}>
        <ThemedText type="subtitle">Tailored travel experiences</ThemedText>
        <ThemedText>
          Craft curated itineraries, highlight hidden gems, and keep travelers inspired with
          beautiful storytelling. This home screen now spotlights the key booking flows for your
          agency.
        </ThemedText>
        <ThemedText style={styles.heroFootnote}>
          {`Use ${Platform.select({ ios: 'Cmd + D', android: 'Cmd + M', web: 'F12' })} to access
          developer tools while refining the experience.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Flexible online payments</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Let guests pay the way they prefer. Combine digital wallets with traditional cards to
          remove friction at checkout and boost conversion.
        </ThemedText>
        {paymentMethods.map((method) => (
          <ThemedView key={method.name} style={styles.paymentCard}>
            <ThemedText style={styles.paymentName}>{method.name}</ThemedText>
            <ThemedText style={styles.paymentDescription}>{method.description}</ThemedText>
            <ExternalLink href={method.url}>
              <ThemedText type="link">Learn more about {method.name}</ThemedText>
            </ExternalLink>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Offer bookings on TripAdvisor</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          Already manage your tours on TripAdvisor? Send travelers directly to your listings so they
          can reserve with confidence using a familiar marketplace.
        </ThemedText>
        <ExternalLink href="https://www.tripadvisor.com/TravelersChoice">
          <ThemedText style={styles.tripAdvisorLink}>Book your tour on TripAdvisor</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroCard: {
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
  heroFootnote: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    gap: 12,
    marginBottom: 18,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  sectionDescription: {
    opacity: 0.85,
  },
  paymentCard: {
    gap: 8,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(161, 206, 220, 0.25)',
  },
  paymentName: {
    fontSize: 18,
    fontWeight: '600',
  },
  paymentDescription: {
    opacity: 0.85,
  },
  tripAdvisorLink: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#34A853',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
