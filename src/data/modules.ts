import type { ModuleGuideExtended } from './moduleTypes';
import { PARENTING_TECHNIQUES } from './techniques';
import { SUNNAH_HABITS } from './habits';
import { ISLAMIC_STORIES } from './stories';

// ---------------------------------------------------------------------------
// All Modules
// ---------------------------------------------------------------------------

export const ALL_MODULES: Record<'technique' | 'habit' | 'story', ModuleGuideExtended[]> = {
  technique: PARENTING_TECHNIQUES,
  habit: SUNNAH_HABITS,
  story: ISLAMIC_STORIES,
};

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getModuleById(id: string): ModuleGuideExtended | undefined {
  return Object.values(ALL_MODULES)
    .flat()
    .find((module) => module.id === id);
}

export function getModulesByType(type: 'technique' | 'habit' | 'story'): ModuleGuideExtended[] {
  return ALL_MODULES[type];
}

export function searchModules(query: string): ModuleGuideExtended[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return Object.values(ALL_MODULES)
    .flat()
    .filter(
      (module) =>
        module.title.toLowerCase().includes(lowerQuery) ||
        module.description.toLowerCase().includes(lowerQuery) ||
        module.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
}

export function getRelatedModules(moduleId: string): ModuleGuideExtended[] {
  const module = getModuleById(moduleId);
  if (!module?.relatedModules) return [];

  return module.relatedModules
    .map((id) => getModuleById(id))
    .filter((m): m is ModuleGuideExtended => m !== undefined);
}

export function getAllModulesFlat(): ModuleGuideExtended[] {
  return Object.values(ALL_MODULES).flat();
}

export function getModuleCount(): { technique: number; habit: number; story: number; total: number } {
  return {
    technique: PARENTING_TECHNIQUES.length,
    habit: SUNNAH_HABITS.length,
    story: ISLAMIC_STORIES.length,
    total: PARENTING_TECHNIQUES.length + SUNNAH_HABITS.length + ISLAMIC_STORIES.length,
  };
}
