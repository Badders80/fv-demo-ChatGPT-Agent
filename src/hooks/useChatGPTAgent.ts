import { useState } from 'react';
import { openai } from '../agentConfig';

export function useChatGPTAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an AI assistant tailoring follow-up questions for a horse stables profile to maximize user intel. Based on the answers, generate 1-2 engaging, relevant questions focused on racing/ownership. Return as JSON array: [{"id": "q1", "text": "Question?", "type": "text"}]'
          },
          { 
            role: 'user', 
            content: `User answers: ${JSON.stringify(formData)}. Generate tailored questions.` 
          },
        ],
      });
      
      const content = response.choices[0].message.content;
      if (!content) return [];
      
      return JSON.parse(content);
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { generateQuestions, loading, error };
}
