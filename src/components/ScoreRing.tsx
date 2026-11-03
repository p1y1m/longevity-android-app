import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { colors, radius, type } from '@/theme';

export function ScoreRing({ score }: { score: number }) {
  const size = 214;
  const strokeWidth = 13;
  const radiusValue = (size - strokeWidth) / 2;
  const circumference = radiusValue * Math.PI * 2;
  const offset = circumference - (score / 100) * circumference;

  return (
    <View style={styles.wrap} accessibilityLabel={`Demonstration longevity score ${score} out of 100`}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.teal} />
            <Stop offset="0.55" stopColor={colors.blue} />
            <Stop offset="1" stopColor={colors.purple} />
          </LinearGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={radiusValue} stroke={colors.surfaceLight} strokeWidth={strokeWidth} fill="transparent" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radiusValue}
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.outOf}>OUT OF 100</Text>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>DEMO SCORE</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 220, height: 220, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  svg: { position: 'absolute' },
  center: { alignItems: 'center' },
  score: { fontSize: 58, lineHeight: 62, color: colors.text, fontWeight: '800', letterSpacing: -2.8 },
  outOf: { ...type.label, color: colors.textMuted, marginTop: -1 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.tealDark, borderRadius: radius.pill, paddingHorizontal: 9, paddingVertical: 5, marginTop: 9 },
  badgeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.teal },
  badgeText: { fontSize: 9, letterSpacing: 0.7, fontWeight: '800', color: colors.teal },
});
