export type OnboardingStackParamList = {
  Welcome: undefined;
  ChildInfo: undefined;
  Struggles: {
    childName: string;
    birthdate: string;
  };
  CurrentHabits: {
    childName: string;
    birthdate: string;
    struggles: string[];
  };
  NotificationTime: {
    childName: string;
    birthdate: string;
    struggles: string[];
    currentHabits: string[];
  };
  Ready: {
    childName: string;
    birthdate: string;
    struggles: string[];
    currentHabits: string[];
    missionTime: string;
  };
};

export type MainTabParamList = {
  Today: undefined;
  Chat: undefined;
  Journey: undefined;
  Library: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
};
