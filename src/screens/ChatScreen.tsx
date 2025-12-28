import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF7ED' },
  content: { flex: 1 },
  header: { backgroundColor: '#10B981', paddingHorizontal: 24, paddingVertical: 16 },
  headerText: { color: 'white', fontSize: 18, fontWeight: '600' },
  messagesContainer: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  aiMessage: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, marginRight: 48, borderWidth: 1, borderColor: '#D1FAE5' },
  aiMessageText: { color: '#0F766E' },
  suggestionsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  suggestionButton: { backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 9999 },
  suggestionText: { color: '#0F766E', fontSize: 14 },
  inputContainer: { paddingHorizontal: 16, paddingBottom: 16 },
  inputWrapper: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 9999, borderWidth: 2, borderColor: '#D1FAE5', alignItems: 'center', paddingHorizontal: 16 },
  textInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#0F766E' },
  micButton: { marginLeft: 8 },
  micEmoji: { fontSize: 24 },
});

export function ChatScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat with Noor</Text>
        </View>

        <ScrollView style={styles.messagesContainer}>
          <View style={styles.aiMessage}>
            <Text style={styles.aiMessageText}>
              Hey mama! What's on your heart today? I'm here to listen
            </Text>
          </View>

          <View style={styles.suggestionsContainer}>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>Bedtime tips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>Stop yelling</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>Picky eater</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionButton}>
              <Text style={styles.suggestionText}>Give me a dua</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Type or speak..."
              placeholderTextColor="#78716C"
            />
            <TouchableOpacity style={styles.micButton}>
              <Text style={styles.micEmoji}>🎤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
