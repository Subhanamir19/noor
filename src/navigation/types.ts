export type OnboardingStackParamList = {
  Welcome: undefined;
  ChildInfo: undefined;
  StruggleSelector: undefined;
};

export type MainTabParamList = {
  Today: undefined;
  Chat: { initialMessage?: string } | undefined;
  Garden: undefined;
  Journey: undefined;
  Library: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Main: undefined;
  ModuleDetail: { moduleId: string };
  DayDetail: { date: string; dailyTraitId?: string };
  Settings: undefined;
};
