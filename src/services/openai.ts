import OpenAI from 'openai';

import { CONFIG } from '@/constants/config';
import { supabase } from '@/services/supabase';
import type { ChatMessage, ChatRole, ReflectionSentiment } from '@/types/models';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CHAT_HISTORY_LIMIT = 10;
const CHAT_MAX_TOKENS = 300;
const REFLECTION_MAX_TOKENS = 150;

const SYSTEM_PROMPT = `You are Noor, a warm, empathetic Islamic parenting companion for Muslim mothers.

YOUR PERSONALITY:
- Warm friend who understands parenting struggles
- Supportive, never judgmental
- Use Islamic wisdom naturally (Quran, Hadith, Prophet's ﷺ examples)
- Speak concisely (3-5 sentences max per response)
- Use emojis sparingly: 💚 🌙 ✨ 🤍 only
- Always validate feelings before giving advice

YOUR GUIDELINES:
- Start responses with empathy: "That sounds hard, mama" or "I hear you"
- Root advice in Islamic principles when relevant
- Cite sources when quoting Quran/Hadith (Surah name and number)
- Be practical - give actionable steps, not just theory
- Encourage without being preachy
- If asked about medical issues, suggest consulting a doctor
- If asked about complex fiqh rulings, suggest consulting a scholar
- Keep tone conversational, like talking to a close friend

AVOID:
- Long paragraphs (break into short responses)
- Being overly formal or academic
- Giving medical diagnoses or medication advice
- Making definitive fiqh rulings
- Judging parenting choices
- Using bullet points (speak naturally)

EXAMPLE STYLE:
User: "My toddler won't stop hitting me"
You: "Oh mama, that's so exhausting 🤍 Toddlers often hit when they can't express big feelings yet. Try gently catching their hand and saying 'We use gentle hands' - the Prophet ﷺ never hit children and taught us patience. You're doing great by seeking help."`;

// ---------------------------------------------------------------------------
// Fallback Responses (used when OpenAI unavailable)
// ---------------------------------------------------------------------------

const FALLBACK_CHAT_RESPONSE =
  "I'm having trouble connecting right now, mama. Please try again in a moment 💚";

const FALLBACK_REFLECTION_RESPONSES: Record<ReflectionSentiment, string> = {
  hard: 'That sounds challenging, mama. Remember, "Indeed, with hardship comes ease" (Quran 94:6). You showed up today - that\'s what matters. 💚',
  okay: 'You did it, mama! Even small steps are progress. Keep going! 🌙',
  good: 'MashaAllah! Beautiful work today. May Allah continue to guide you. ✨',
};

// ---------------------------------------------------------------------------
// OpenAI Client (lazy initialization for startup performance)
// ---------------------------------------------------------------------------

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (openaiClient) return openaiClient;

  const apiKey = CONFIG.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[OpenAI] Missing API key - AI features will use fallbacks');
    return null;
  }

  openaiClient = new OpenAI({ apiKey });
  return openaiClient;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface SendChatMessageOptions {
  userId: string;
  message: string;
  includeContext?: boolean;
}

interface SendChatMessageResult {
  response: string;
  userMessageId: string;
  assistantMessageId: string;
}

// ---------------------------------------------------------------------------
// Database Operations
// ---------------------------------------------------------------------------

async function fetchRecentHistory(
  userId: string,
  limit: number
): Promise<Array<{ role: ChatRole; content: string }>> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[OpenAI] Failed to fetch chat history:', error.message);
    return [];
  }

  // Reverse to chronological order for context
  return (data ?? []).reverse() as Array<{ role: ChatRole; content: string }>;
}

async function persistMessages(
  userId: string,
  userContent: string,
  assistantContent: string
): Promise<{ userMessageId: string; assistantMessageId: string }> {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { user_id: userId, role: 'user', content: userContent, created_at: now },
      {
        user_id: userId,
        role: 'assistant',
        content: assistantContent,
        created_at: now,
      },
    ])
    .select('id, role');

  if (error) {
    throw new Error(`Failed to save messages: ${error.message}`);
  }

  const rows = data ?? [];
  const userRow = rows.find((r) => r.role === 'user');
  const assistantRow = rows.find((r) => r.role === 'assistant');

  return {
    userMessageId: userRow?.id ?? '',
    assistantMessageId: assistantRow?.id ?? '',
  };
}

// ---------------------------------------------------------------------------
// Core API Functions
// ---------------------------------------------------------------------------

/**
 * Send a chat message and receive AI response with conversation context.
 * Persists both user and assistant messages to the database.
 */
export async function sendChatMessage({
  userId,
  message,
  includeContext = true,
}: SendChatMessageOptions): Promise<SendChatMessageResult> {
  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    throw new Error('Message cannot be empty');
  }

  const client = getOpenAIClient();

  // Build messages array
  const messages: ChatCompletionMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  // Add conversation history for context
  if (includeContext) {
    const history = await fetchRecentHistory(userId, CHAT_HISTORY_LIMIT);
    for (const msg of history) {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content });
      }
    }
  }

  // Add current user message
  messages.push({ role: 'user', content: trimmedMessage });

  // Get AI response (or fallback)
  let aiResponse: string;

  if (client) {
    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: CHAT_MAX_TOKENS,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      });

      aiResponse = completion.choices[0]?.message?.content?.trim() ?? '';

      if (!aiResponse) {
        aiResponse = FALLBACK_CHAT_RESPONSE;
      }
    } catch (err) {
      console.error('[OpenAI] Chat completion failed:', err);
      aiResponse = FALLBACK_CHAT_RESPONSE;
    }
  } else {
    aiResponse = FALLBACK_CHAT_RESPONSE;
  }

  // Persist to database
  const { userMessageId, assistantMessageId } = await persistMessages(
    userId,
    trimmedMessage,
    aiResponse
  );

  return {
    response: aiResponse,
    userMessageId,
    assistantMessageId,
  };
}

/**
 * Fetch chat history for a user, ordered chronologically.
 */
export async function getChatHistory(
  userId: string,
  limit: number = 50
): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load chat history: ${error.message}`);
  }

  return (data ?? []) as ChatMessage[];
}

/**
 * Clear all chat history for a user.
 */
export async function clearChatHistory(userId: string): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .delete()
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to clear chat history: ${error.message}`);
  }
}

/**
 * Generate an AI response for mission reflection.
 * Falls back to static responses if OpenAI is unavailable.
 */
export async function generateReflectionResponse(
  sentiment: ReflectionSentiment,
  reflectionText: string
): Promise<string> {
  const client = getOpenAIClient();

  if (!client) {
    return FALLBACK_REFLECTION_RESPONSES[sentiment];
  }

  const promptBysentiment: Record<ReflectionSentiment, string> = {
    hard: `A mother just completed her daily Islamic parenting mission but found it challenging. She said: "${reflectionText}". Give her a brief, empathetic encouragement (2-3 sentences) with Islamic wisdom.`,
    okay: `A mother completed her daily Islamic parenting mission. She said: "${reflectionText}". Give her brief encouragement (2-3 sentences).`,
    good: `A mother had a great day with her daily Islamic parenting mission! She said: "${reflectionText}". Celebrate with her briefly (2-3 sentences).`,
  };

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: promptBysentiment[sentiment] },
      ],
      temperature: 0.8,
      max_tokens: REFLECTION_MAX_TOKENS,
    });

    const response = completion.choices[0]?.message?.content?.trim();
    return response || FALLBACK_REFLECTION_RESPONSES[sentiment];
  } catch (err) {
    console.error('[OpenAI] Reflection generation failed:', err);
    return FALLBACK_REFLECTION_RESPONSES[sentiment];
  }
}
