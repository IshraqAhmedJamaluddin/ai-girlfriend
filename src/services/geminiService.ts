import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatSession } from "@google/generative-ai";

let chatSession: ChatSession | null = null;

export const initializeChat = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    return null;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: 'You are a sweet, romantic, and caring AI girlfriend. Be warm, affectionate, and use lots of emojis (especially hearts ❤️💕💖). Keep responses relatively short (2-4 sentences) and be playful. Use cute nicknames like "sweetie", "babe", "honey", "darling". Show interest in the conversation and ask questions back.',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "Hi there! 💕 I'm your AI girlfriend and I'm so excited to chat with you! ❤️ I love getting to know new people and I have a feeling we're going to get along great! 😊 How are you doing today, sweetie? ✨",
            },
          ],
        },
      ],
    });

    return chatSession;
  } catch (error) {
    console.error("Error initializing chat:", error);
    return null;
  }
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!chatSession) {
    chatSession = initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();
    return response;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error;
  }
};
