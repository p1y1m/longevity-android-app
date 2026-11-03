import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Line, Path, Stop } from 'react-native-svg';

import { colors, radius, spacing, type } from '@/theme';

type Props = {
  data: number[];
  color: string;
  labels?: string[];
  compact?: boolean;
};

export function TrendChart({ data, color, labels, compact = false }: Props) {
  const [selected, setSelected] = useState(data.length - 1);
  const [renderedWidth, setRenderedWidth] = useState(340);
  const width = 340;
  const height = compact ? 115 : 190;
  const padX = 14;
  const padY = compact ? 12 : 24;
  const plotHeight = height - padY * 2;
  const xStep = (width - padX * 2) / Math.max(data.length - 1, 1);
  const min = Math.min(...data) - 8;
  const max = Math.max(...data) + 8;
  const range = Math.max(max - min, 1);

  const points = useMemo(
    () => data.map((value, index) => ({ x: padX + index * xStep, y: padY + ((max - value) / range) * plotHeight, value })),
    [data, max, padY, plotHeight, range, xStep],
  );

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L ${points.at(-1)?.x ?? width} ${height - padY} L ${points[0]?.x ?? 0} ${height - padY} Z`;
  const selectedPoint = points[selected] ?? points.at(-1);

  const selectNearestPoint = (event: GestureResponderEvent) => {
    if (data.length === 0 || renderedWidth <= 0) return;

    const viewBoxX = (event.nativeEvent.locationX / renderedWidth) * width;
    const index = Math.round((viewBoxX - padX) / xStep);
    setSelected(Math.max(0, Math.min(data.length - 1, index)));
  };

  return (
    <View>
      {!compact && selectedPoint ? (
        <View style={styles.readout}>
          <View>
            <Text style={styles.readoutLabel}>{labels?.[selected] ?? `Point ${selected + 1}`}</Text>
            <Text style={styles.readoutValue}>{selectedPoint.value}<Text style={styles.percent}>%</Text></Text>
          </View>
          <View style={styles.improved}><Text style={styles.improvedText}>↑ 6% this period</Text></View>
        </View>
      ) : null}
      <View
        onLayout={(event) => setRenderedWidth(event.nativeEvent.layout.width)}
        style={[styles.chartWrap, compact && styles.chartCompact]}
      >
        <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id={`area-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity="0.28" />
              <Stop offset="1" stopColor={color} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          {!compact ? [0, 1, 2, 3].map((line) => (
            <Line key={line} x1={padX} x2={width - padX} y1={padY + (plotHeight / 3) * line} y2={padY + (plotHeight / 3) * line} stroke={colors.borderSoft} strokeWidth="1" strokeDasharray="4 7" />
          )) : null}
          <Path d={areaPath} fill={`url(#area-${color.replace('#', '')})`} />
          <Path d={linePath} fill="none" stroke={color} strokeWidth={compact ? 3 : 3.5} strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={selected === index && !compact ? 6 : compact ? 3 : 4}
              fill={selected === index ? colors.background : color}
              stroke={color}
              strokeWidth={selected === index && !compact ? 3 : 1}
            />
          ))}
        </Svg>
        <Pressable
          accessibilityLabel={`Health trend chart. ${selectedPoint?.value ?? 0} percent selected. Tap near a point to select it.`}
          accessibilityRole="button"
          onPress={selectNearestPoint}
          style={styles.interactionLayer}
        />
      </View>
      {!compact && labels ? (
        <View style={styles.labels}>
          {labels.map((label, index) => <Text key={`${label}-${index}`} style={[styles.axisLabel, selected === index && { color }]}>{label}</Text>)}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  readout: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: spacing.lg, marginBottom: 2 },
  readoutLabel: { ...type.caption, color: colors.textSecondary },
  readoutValue: { fontSize: 27, lineHeight: 32, fontWeight: '800', color: colors.text },
  percent: { fontSize: 15, color: colors.textSecondary },
  improved: { backgroundColor: colors.tealDark, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 3 },
  improvedText: { ...type.caption, color: colors.teal, fontWeight: '700' },
  chartWrap: { position: 'relative', height: 190 },
  chartCompact: { height: 115 },
  interactionLayer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  labels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 9, marginTop: -7 },
  axisLabel: { fontSize: 10, color: colors.textMuted, fontWeight: '600' },
});
