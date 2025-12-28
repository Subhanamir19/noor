import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuthStore } from '@/store/authStore';
import type { RootStackParamList, OnboardingStackParamList, MainTabParamList } from './types';

// Screens
import { TodayScreen } from '@/screens/TodayScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { JourneyScreen } from '@/screens/JourneyScreen';
import { LibraryScreen } from '@/screens/LibraryScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import {
  WelcomeScreen,
  ChildInfoScreen,
  StrugglesScreen,
  CurrentHabitsScreen,
  NotificationTimeScreen,
  ReadyScreen,
} from '@/screens/onboarding';

import { COLORS } from '@/constants/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F766E',
    marginBottom: 16,
  },
});

function LoadingScreen() {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.emoji}>🌙</Text>
      <Text style={loadingStyles.title}>Noor</Text>
      <ActivityIndicator size="large" color={COLORS.EMERALD} />
    </View>
  );
}

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
      <OnboardingStack.Screen name="ChildInfo" component={ChildInfoScreen} />
      <OnboardingStack.Screen name="Struggles" component={StrugglesScreen} />
      <OnboardingStack.Screen name="CurrentHabits" component={CurrentHabitsScreen} />
      <OnboardingStack.Screen name="NotificationTime" component={NotificationTimeScreen} />
      <OnboardingStack.Screen name="Ready" component={ReadyScreen} />
    </OnboardingStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF7ED',
          borderTopColor: '#D1FAE5',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: COLORS.EMERALD,
        tabBarInactiveTintColor: COLORS.WARM_GRAY,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <MainTab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🌟</Text>,
        }}
      />
      <MainTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>💬</Text>,
        }}
      />
      <MainTab.Screen
        name="Journey"
        component={JourneyScreen}
        options={{
          tabBarLabel: 'Journey',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📸</Text>,
        }}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📚</Text>,
        }}
      />
      <MainTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>⚙️</Text>,
        }}
      />
    </MainTab.Navigator>
  );
}

export function RootNavigator() {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const profile = useAuthStore((state) => state.profile);
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Show loading while initializing
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // Determine if onboarding is complete
  const showOnboarding = !profile?.onboarding_completed;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <RootStack.Screen
            name="Onboarding"
            component={OnboardingNavigator}
            options={{ gestureEnabled: false }}
          />
        ) : (
          <RootStack.Screen
            name="Main"
            component={MainNavigator}
            options={{ gestureEnabled: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
