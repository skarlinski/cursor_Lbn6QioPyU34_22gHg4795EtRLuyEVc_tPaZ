// make a fucnction to generate a response using the openai api, make everything configurable.
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function generateResponse(
  prompt,
  model,
  temperature,
  maxTokens,
  topP,
  frequencyPenalty,
  presencePenalty
) {
  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    generationConfig: {
      temperature: temperature,
      maxOutputTokens: maxTokens,
      topP: topP,
      frequencyPenalty: frequencyPenalty,
      presencePenalty: presencePenalty,
    },
  });
  return response.text;
}