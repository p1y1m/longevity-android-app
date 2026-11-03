# Longevity

Longevity is a portfolio-quality health analytics MVP built with React Native, Expo SDK 57, Expo Router, and TypeScript. It combines realistic demonstration data with an interactive score, trend exploration, habit tracking, health insights, and editable goals.

> The Longevity Score and all health data in this app are fictional demonstrations. The score is not clinically validated, and the app does not provide medical advice.

## Highlights

- Five-screen Expo Router tab experience optimized for Android and responsive on web
- Personalized demonstration score that responds to in-app habit and check-in state
- Interactive SVG charts with selectable health metrics and 7-day, 4-week, and 3-month periods
- Daily habit completion, streaks, weekly progress, and responsive visual feedback
- Filterable sample-data insights with actionable interactions
- Editable sleep, activity, and strength goals plus working preference controls
- Reusable TypeScript components, a centralized design system, and an in-memory app context

## Requirements

- Node.js 22.13 or newer (Expo SDK 57 requires Node 22.13.x or newer)
- npm
- Expo Go on an Android device, or an Android emulator

## Run locally

From this directory:

```bash
npm install
npm run start
```

Then scan the QR code with Expo Go. If the phone cannot reach the development machine over the local network, use:

```bash
npx expo start --tunnel
```

Other useful commands:

```bash
npm run android
npm run web
npm run typecheck
npm run doctor
```

## Project structure

```text
app/                  Expo Router routes and bottom tabs
src/components/       Reusable visual and interaction components
src/context/          Shared in-memory app state
src/data/             Realistic mock health data
src/theme/            Color, spacing, typography, and elevation tokens
src/types/            Domain types
```

This MVP intentionally has no backend. Refreshing the app resets changes to the bundled mock state.
