const PRACTICE_LOTTIES = [
  require('../../assets/lottie/android-wave.json'),
  require('../../assets/lottie/hamburger-arrow.json'),
  require('../../assets/lottie/lottie-logo-1.json'),
  require('../../assets/lottie/lottie-logo-2.json'),
  require('../../assets/lottie/watermelon.json'),
  require('../../assets/lottie/lottie-logo-1-alt.json'),
  require('../../assets/lottie/dynamic-text.json'),
] as const;

function stableHash(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getPracticeVisualSource(practiceId: string) {
  const index = stableHash(practiceId) % PRACTICE_LOTTIES.length;
  return PRACTICE_LOTTIES[index];
}

