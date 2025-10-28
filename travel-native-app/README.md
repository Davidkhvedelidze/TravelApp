# Travel Native App

A React Native (Expo) translation of the **Must See Georgia** travel planner originally implemented with Next.js. The mobile experience keeps the curated itineraries, tour calculator, and editorial content while adapting the UI to a touch-first design.

## Highlights

- Home screen hero with brand story, signature metrics, and quick navigation
- Tours catalogue with region/theme filters and persistent favourites
- Rich tour details with image galleries, day-by-day agenda, interactive calendar, and price estimator
- Travel journal with full article view mirroring desktop content
- Concierge contact flows and request forms tailored for mobile

## Project Structure

```
travel-native-app/
├── App.js                 # Navigation container & screen registry
├── app.json               # Expo configuration
├── babel.config.js        # Babel preset for Expo
├── package.json           # Dependencies aligned with Expo SDK 51
└── src/
    ├── components/        # Reusable UI (calendar, cards, calculator, etc.)
    ├── data/              # Static tour & blog datasets ported from web app
    ├── screens/           # Feature screens (Home, Tours, TourDetail, Blog, Contact)
    ├── store/             # Favourites context mirroring web valtio store
    └── theme/             # Shared colour palette
```

## Getting Started

1. Install dependencies (requires Node 18+):
   ```bash
   cd travel-native-app
   npm install
   ```
2. Launch the Expo development server:
   ```bash
   npm run start
   ```
3. Follow the CLI prompts to open the project on an emulator, simulator, or Expo Go mobile app.

## Feature Parity Notes

- **Data parity:** Tour and blog content mirrors `/data/tours.js` and `/data/blog.js` from the Next.js app.
- **State management:** Local favourites replicate the behaviour of the Valtio store; persistence can be layered in via `AsyncStorage`.
- **Pricing logic:** The price calculator reproduces the season, accommodation, and group logic used in the web `PriceCalculator` component.
- **Calendars & forms:** Calendar selection and concierge forms are purpose-built for React Native while maintaining original copy and flow.

## Next Steps

- Integrate authentication or backend APIs when available
- Persist favourites and form drafts via secure storage
- Localise copy and currency formats for target markets
- Add automated tests (e.g., Jest + React Native Testing Library)
