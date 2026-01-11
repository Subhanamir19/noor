import { supabase } from './supabase';

export interface OnboardingDataRecord {
  id: string;
  user_id: string;
  child_name: string;
  child_age: number;
  child_gender: 'boy' | 'girl';
  primary_struggle: string;
  created_at: string;
  updated_at: string;
}

export async function getOnboardingData(userId: string): Promise<OnboardingDataRecord | null> {
  const { data, error } = await supabase
    .from('onboarding_data')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }
  return data;
}

export async function checkOnboardingComplete(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('onboarding_data')
    .select('id')
    .eq('user_id', userId)
    .single();

  return !!data;
}

export async function saveOnboardingData(
  userId: string,
  data: {
    childName: string;
    childAge: number;
    childGender: 'boy' | 'girl';
    primaryStruggle: string;
  }
): Promise<boolean> {
  // Check if user already has onboarding data
  const { data: existing } = await supabase
    .from('onboarding_data')
    .select('id')
    .eq('user_id', userId)
    .single();

  let error;

  if (existing?.id) {
    // Update existing record
    const result = await supabase
      .from('onboarding_data')
      .update({
        child_name: data.childName,
        child_age: data.childAge,
        child_gender: data.childGender,
        primary_struggle: data.primaryStruggle,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id);
    error = result.error;
  } else {
    // Insert new record
    const result = await supabase.from('onboarding_data').insert({
      user_id: userId,
      child_name: data.childName,
      child_age: data.childAge,
      child_gender: data.childGender,
      primary_struggle: data.primaryStruggle,
    });
    error = result.error;
  }

  if (error) throw error;
  return true;
}
