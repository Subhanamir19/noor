import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TraitResource } from '@/types/models';
import { COLORS } from '@/constants/colors';

interface Props {
  resource: TraitResource;
}

export const TraitResourceCard: React.FC<Props> = ({ resource }) => {
  if (resource.type === 'hadith') {
    return (
      <View style={[styles.card, styles.hadithCard]}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>📜</Text>
          <Text style={styles.title}>Hadith</Text>
        </View>
        <Text style={styles.translation}>{resource.translation}</Text>
        {resource.reference && (
          <View style={styles.referenceBox}>
            <Text style={styles.referenceText}>Reference: {resource.reference}</Text>
          </View>
        )}
      </View>
    );
  }

  if (resource.type === 'quran') {
    return (
      <View style={[styles.card, styles.quranCard]}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>📖</Text>
          <Text style={styles.title}>Quran</Text>
        </View>

        {resource.arabic && (
          <View style={styles.arabicBox}>
            <Text style={styles.arabicText}>{resource.arabic}</Text>
          </View>
        )}

        <Text style={styles.translation}>{resource.translation}</Text>

        {resource.surah && resource.ayah && (
          <View style={styles.referenceBox}>
            <Text style={styles.referenceText}>
              Surah {resource.surah} • Ayah {resource.ayah}
            </Text>
          </View>
        )}
      </View>
    );
  }

  if (resource.type === 'dua') {
    return (
      <View style={[styles.card, styles.duaCard]}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>🤲</Text>
          <Text style={styles.title}>Dua</Text>
        </View>

        {resource.arabic && (
          <View style={styles.arabicBox}>
            <Text style={[styles.arabicText, styles.centeredText]}>{resource.arabic}</Text>
          </View>
        )}

        {resource.transliteration && (
          <View style={styles.transliterationBox}>
            <Text style={styles.transliterationText}>{resource.transliteration}</Text>
          </View>
        )}

        <Text style={[styles.translation, styles.centeredText]}>"{resource.translation}"</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  hadithCard: {
    backgroundColor: 'rgba(217, 174, 94, 0.1)',
    borderColor: COLORS.GOLD,
  },
  quranCard: {
    backgroundColor: 'rgba(14, 117, 109, 0.1)',
    borderColor: COLORS.EMERALD,
  },
  duaCard: {
    backgroundColor: 'rgba(227, 183, 160, 0.2)',
    borderColor: COLORS.BLUSH,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEAL,
  },
  translation: {
    fontSize: 16,
    color: COLORS.TEAL,
    lineHeight: 24,
    marginBottom: 12,
  },
  arabicBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  arabicText: {
    fontSize: 20,
    textAlign: 'right',
    lineHeight: 36,
    color: COLORS.TEAL,
  },
  transliterationBox: {
    backgroundColor: 'rgba(167, 201, 162, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  transliterationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: COLORS.TEAL,
    textAlign: 'center',
    fontWeight: '500',
  },
  referenceBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 12,
  },
  referenceText: {
    fontSize: 14,
    color: COLORS.WARM_GRAY,
    fontWeight: '500',
  },
  centeredText: {
    textAlign: 'center',
  },
});
