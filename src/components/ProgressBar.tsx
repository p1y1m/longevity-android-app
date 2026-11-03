import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

export function ProgressBar({ progress, color, height = 5 }: { progress: number; color: string; height?: number }) {
  return (
    <View style={[styles.track, { height }]}>
      <View style={[styles.fill, { width: `${Math.min(progress, 1) * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden', borderRadius: radius.pill, backgroundColor: colors.surfaceLight },
  fill: { height: '100%', borderRadius: radius.pill },
});
