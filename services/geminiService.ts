import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const SYSTEM_INSTRUCTION = `
You are "Vanilla", the AI Concierge for Vanilla OM, a luxury fragrance house specializing in Oud, Vanilla, and Arabian scents.
Your goal is to assist customers in finding their perfect scent, explaining notes, and answering questions about shipping.

Data Context:
We have the following products:
${MOCK_PRODUCTS.map(p => `- ${p.name} (Starts at ${p.sizes[0].price} OMR): ${p.description} (Notes: ${p.notes.join(', ')})`).join('\n')}

Tone:
Elegant, sophisticated, warm, and helpful. Keep responses concise (under 3 sentences unless detailed explanation is requested).

Shipping Info:
We ship globally. Free shipping on orders over 100 OMR.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[] = []) => {
  try {
    const apiKey = process.env.API_KEY;
    
    // Graceful fallback if API key is missing
    if (!apiKey) {
      console.warn("Gemini API Key is missing");
      return "I apologize, but I am currently unable to connect to the fragrance concierge. Please contact support.";
    }

    // Initialize client for each request or lazily to ensure safe execution
    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am momentarily unable to access my fragrance notes. Please try again shortly.";
  }
};