import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log('OpenAI API Key loaded:', !!apiKey); // True if loaded
console.log('API Key prefix:', apiKey ? apiKey.substring(0, 7) + '...' : 'undefined');

if (!apiKey) {
  console.error('VITE_OPENAI_API_KEY is not set in environment variables');
}

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key', // Provide fallback to prevent constructor error
  dangerouslyAllowBrowser: true, // ⚠️ Only use for local development/testing
});
