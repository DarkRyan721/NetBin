import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Definir el color de los iconos dependiendo del esquema de colores
  const iconColor = colorScheme === 'dark' ? 'white' : 'black';

  return (
    <AuthProvider>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={iconColor} />,  // Usar iconColor aquí
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome5 name="question" size={24} color={iconColor} />,  // Usar iconColor aquí
          }}
        />
        <Tabs.Screen
          name="NFC_sharing"
          options={{
            title: 'NFC',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="nfc" size={24} color={iconColor} />,  // Usar iconColor aquí
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
