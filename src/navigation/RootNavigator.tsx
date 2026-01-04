import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OnboardingProvider } from '@/context/OnboardingContext';
import { COLORS } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import type {
  MainTabParamList,
  OnboardingStackParamList,
  RootStackParamList,
} from './types';

// Screens
import { ChatScreen } from '@/screens/ChatScreen';
import { DayDetailScreen } from '@/screens/DayDetailScreen';
import { GardenScreen } from '@/screens/GardenScreen';
import { JourneyScreen } from '@/screens/JourneyScreenNew';
import { LibraryScreen } from '@/screens/LibraryScreen';
import { ModuleDetailScreen } from '@/screens/ModuleDetailScreen';
import { DailyTaskDetailScreen } from '@/screens/DailyTaskDetailScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { TodayScreen } from '@/screens/TodayScreen';
import {
  ChildInfoScreen,
  StruggleSelectorScreen,
  WelcomeScreen,
} from '@/screens/onboarding';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICON_SIZE = 28;

const TAB_ICONS: Record<keyof MainTabParamList, ImageSourcePropType> = {
  Today: require('../../assets/ONBOARDING-ASSETS/icons/today.png'),
  Chat: require('../../assets/ONBOARDING-ASSETS/icons/chat.png'),
  Garden: require('../../assets/ONBOARDING-ASSETS/icons/garden.png'),
  Journey: require('../../assets/ONBOARDING-ASSETS/icons/journey.png'),
  Library: require('../../assets/ONBOARDING-ASSETS/icons/library.png'),
};

function TabIcon({
  focused,
  routeName,
}: {
  focused: boolean;
  routeName: keyof MainTabParamList;
}) {
  return (
    <Image
      source={TAB_ICONS[routeName]}
      style={{
        width: TAB_ICON_SIZE,
        height: TAB_ICON_SIZE,
        opacity: focused ? 1 : 0.55,
        transform: [{ scale: focused ? 1.06 : 1 }],
      }}
      resizeMode="contain"
    />
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7ED',
    alignItems: 'center',
    justifyContent: 'center',
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
      <Text style={loadingStyles.title}>Noor</Text>
      <ActivityIndicator size="large" color={COLORS.EMERALD} />
    </View>
  );
}

function OnboardingNavigator() {
  return (
    <OnboardingProvider>
      <OnboardingStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
        <OnboardingStack.Screen name="ChildInfo" component={ChildInfoScreen} />
        <OnboardingStack.Screen
          name="StruggleSelector"
          component={StruggleSelectorScreen}
        />
      </OnboardingStack.Navigator>
    </OnboardingProvider>
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
          fontSize: 11,
          fontFamily: 'Inter-Medium',
        },
      }}
    >
      <MainTab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} routeName="Today" />
          ),
        }}
      />
      <MainTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} routeName="Chat" />
          ),
        }}
      />
      <MainTab.Screen
        name="Garden"
        component={GardenScreen}
        options={{
          tabBarLabel: 'Garden',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} routeName="Garden" />
          ),
        }}
      />
      <MainTab.Screen
        name="Journey"
        component={JourneyScreen}
        options={{
          tabBarLabel: 'Journey',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} routeName="Journey" />
          ),
        }}
      />
      <MainTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} routeName="Library" />
          ),
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

  if (!isInitialized) {
    return <LoadingScreen />;
  }

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
          <>
            <RootStack.Screen
              name="Main"
              component={MainNavigator}
              options={{ gestureEnabled: false }}
            />
            <RootStack.Screen
              name="ModuleDetail"
              component={ModuleDetailScreen}
              options={{
                animation: 'slide_from_right',
                presentation: 'card',
              }}
            />
            <RootStack.Screen
              name="DayDetail"
              component={DayDetailScreen}
              options={{
                animation: 'slide_from_right',
                presentation: 'card',
              }}
            />
            <RootStack.Screen
              name="DailyTaskDetail"
              component={DailyTaskDetailScreen}
              options={{
                animation: 'slide_from_right',
                presentation: 'card',
              }}
            />
            <RootStack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                animation: 'slide_from_bottom',
                presentation: 'modal',
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
