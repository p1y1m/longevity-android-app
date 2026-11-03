import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

const icons: Record<string, { active: string; inactive: string }> = {
  index: { active: 'home', inactive: 'home-outline' },
  trends: { active: 'analytics', inactive: 'analytics-outline' },
  habits: { active: 'checkmark-done-circle', inactive: 'checkmark-done-circle-outline' },
  insights: { active: 'sparkles', inactive: 'sparkles-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.item,
        tabBarIcon: ({ focused, color }) => {
          const icon = icons[route.name] ?? icons.index;
          return (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={(focused ? icon.active : icon.inactive) as never} size={21} color={color} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Today' }} />
      <Tabs.Screen name="trends" options={{ title: 'Trends' }} />
      <Tabs.Screen name="habits" options={{ title: 'Habits' }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
      <Tabs.Screen name="profile" options={{ title: 'You' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: Platform.OS === 'ios' ? 88 : 74,
    paddingTop: 7,
    paddingBottom: Platform.OS === 'ios' ? 23 : 8,
    backgroundColor: 'rgba(10,16,28,0.97)',
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    elevation: 0,
  },
  item: { paddingTop: 2 },
  label: { fontSize: 10, fontWeight: '700', marginTop: 2 },
  iconWrap: { width: 39, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  iconWrapActive: { backgroundColor: 'rgba(57,230,197,0.11)' },
});
