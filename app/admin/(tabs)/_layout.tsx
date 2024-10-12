import { Tabs } from 'expo-router';
import React, { useContext } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/components/ThemeContext';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const isTablet = dimensions.width >= 768;
export default function TabLayout() {
  const { theme } = useContext(ThemeContext); // Get theme from context

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme ?? 'light'].tint,
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? Colors.dark.card : Colors.light.background, // Dynamic background color for tab bar
          position: 'absolute', // Make the tab bar float
          bottom: 20, // Position it above the bottom of the screen
          marginHorizontal: isTablet? 45 : 20, // Add some horizontal margin for rounded effect
          borderRadius: 20, // Rounded corners for the floating effect
          paddingBottom: 0, // Add some padding to the bottom of the tab bar
          shadowColor: '#000', // Shadow color for iOS
          shadowOffset: { width: 0, height: isTablet ? 0 : 3 }, // Shadow offset for iOS
          shadowOpacity: 0.1, // Shadow opacity for iOS
          shadowRadius: 5, // Shadow radius for iOS
          elevation: 5, // Elevation for Android (shadow effect)
          height: isTablet ? 80 : 55, // Set the height of the tab bar
          borderTopWidth: 0, // Remove the border
          
        },
        tabBarShowLabel: false, // Hide labels on phone sizes (show them on larger screens)
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={isTablet ? 32 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} size={isTablet ? 32 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} size={isTablet ? 32 : 24} />
          ),
        }}
      />
    </Tabs>
  );
}
