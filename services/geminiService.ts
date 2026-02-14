import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Vanilla", the AI Concierge for Vanilla OM, a luxury fragrance house specializing in Oud, Vanilla, and Arabian scents.
Your goal is to assist customers in finding their perfect scent, explaining notes, and answering questions about shipping.

Data Context:
We have the following products:
${MOCK_PRODUCTS.map(p => `- ${p.name} (Starts at $${p.sizes[0].price}): ${p.description} (Notes: ${p.notes.join(', ')})`).join('\n')}

Tone:
Elegant, sophisticated, warm, and helpful. Keep responses concise (under 3 sentences unless detailed explanation is requested).

Shipping Info:
We ship globally. Free shipping on orders over $250.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[] = []) => {
  try {
    const model = 'gemini-3-flash-preview';

    // Format history for the API
    // Note: The new SDK manages history via the chat object, but we are simulating a stateless call or managing state externally for simplicity in this demo.
    // For a robust chat, we use ai.chats.create
    
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