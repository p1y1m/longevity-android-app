import { Platform } from 'react-native';

export const colors = {
  background: '#070B14',
  backgroundElevated: '#0B111E',
  surface: '#101827',
  surfaceLight: '#162235',
  surfacePressed: '#1B2A40',
  border: '#223149',
  borderSoft: 'rgba(255,255,255,0.07)',
  text: '#F5F8FC',
  textSecondary: '#95A4BA',
  textMuted: '#65758D',
  teal: '#39E6C5',
  tealDark: '#143C3B',
  blue: '#56A8FF',
  blueDark: '#142E4A',
  purple: '#A985FF',
  purpleDark: '#2B2046',
  amber: '#FFBD5B',
  amberDark: '#49351B',
  coral: '#FF7C8B',
  success: '#61E294',
  white: '#FFFFFF',
  transparent: 'transparent',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
  },
  android: { elevation: 5 },
  default: {
    boxShadow: '0 10px 32px rgba(0,0,0,0.25)',
  },
});

export const type = {
  hero: { fontSize: 38, lineHeight: 44, fontWeight: '800' as const, letterSpacing: -1.4 },
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '800' as const, letterSpacing: -0.8 },
  h2: { fontSize: 20, lineHeight: 26, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 16, lineHeight: 22, fontWeight: '700' as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 17, fontWeight: '500' as const },
  label: { fontSize: 11, lineHeight: 16, fontWeight: '700' as const, letterSpacing: 0.8 },
};
