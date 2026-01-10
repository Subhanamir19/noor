import type { NavigatorScreenParams } from '@react-navigation/native';

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
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  ModuleDetail: { moduleId: string };
  DayDetail: { date: string; dailyTraitId?: string };
  DailyTaskDetail: { taskId: string };
  TraitPracticeList: { traitId: string };
  Tarbiyah: { lessonId?: string } | undefined;
  Settings: undefined;
};
