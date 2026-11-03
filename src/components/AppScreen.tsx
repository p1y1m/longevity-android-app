import { type PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';
import { colors, spacing } from '@/theme';

type Props = PropsWithChildren<{
  contentStyle?: ViewStyle;
  scroll?: boolean;
}>;

export function AppScreen({ children, contentStyle, scroll = true }: Props) {
  const { reducedMotion } = useApp();
  const opacity = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(reducedMotion ? 0 : 10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  const content = (
    <Animated.View style={[styles.content, contentStyle, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowSide} />
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {content}
        </ScrollView>
      ) : content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1 },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', paddingHorizontal: spacing.xl, paddingBottom: 120 },
  glowTop: { position: 'absolute', top: -150, right: -110, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(57,230,197,0.055)' },
  glowSide: { position: 'absolute', top: 280, left: -180, width: 320, height: 320, borderRadius: 160, backgroundColor: 'rgba(130,91,255,0.04)' },
});
