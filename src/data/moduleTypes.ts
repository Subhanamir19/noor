import type { ModuleGuide } from '@/types/models';

// ---------------------------------------------------------------------------
// Module Categories
// ---------------------------------------------------------------------------

export const MODULE_CATEGORIES = {
  TECHNIQUE: 'technique',
  HABIT: 'habit',
  STORY: 'story',
} as const;

// ---------------------------------------------------------------------------
// Extended Types
// ---------------------------------------------------------------------------

export interface ModuleSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'dua' | 'hadith' | 'quote';
}

export interface ModuleGuideExtended extends ModuleGuide {
  sections: ModuleSection[];
  relatedModules?: string[];
}
