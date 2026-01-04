import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/services/supabase';

interface OnboardingData {
  childName: string;
  childAge: number | null;
  childGender: 'boy' | 'girl' | null;
  primaryStruggle: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  saveToDatabase: () => Promise<void>;
  resetOnboardingData: () => void;
}

const defaultData: OnboardingData = {
  childName: '',
  childAge: null,
  childGender: null,
  primaryStruggle: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultData);
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
  };

  const saveToDatabase = async () => {
    if (!user) throw new Error('User not authenticated');

    // Save to onboarding_data table
    const { error: onboardingError } = await supabase
      .from('onboarding_data')
      .upsert({
        user_id: user.id,
        child_name: onboardingData.childName,
        child_age: onboardingData.childAge,
        child_gender: onboardingData.childGender,
        primary_struggle: onboardingData.primaryStruggle,
        updated_at: new Date().toISOString(),
      });

    if (onboardingError) throw onboardingError;

    // Update profile to mark onboarding complete & sync child_name
    await updateProfile({
      child_name: onboardingData.childName,
      onboarding_completed: true,
    });
  };

  const resetOnboardingData = () => {
    setOnboardingData(defaultData);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        saveToDatabase,
        resetOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
