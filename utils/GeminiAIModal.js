import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // or "gemini-pro", "gemini-1.0", etc.
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
};

export async function createChatSession(promptText) {
  const chat = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chat.sendMessage(promptText);
  return result;
}
