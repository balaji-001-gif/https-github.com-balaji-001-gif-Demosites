import { GoogleGenAI, Type } from "@google/genai";
import { AIInsightResponse } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateProductInsight = async (productName: string, subdomain: string): Promise<AIInsightResponse> => {
  if (!apiKey) {
    return {
      summary: "API Key is missing. Please configure the environment variable to enable AI insights.",
      features: ["Manual review required", "Check configuration"]
    };
  }

  try {
    const prompt = `
      You are a senior product marketing expert for a B2B SaaS company called "Aimaxl".
      Analyze the product name "${productName}" and subdomain "${subdomain}".
      
      1. Invent a plausible, professional 2-sentence executive summary of what this software likely does.
      2. List 3 potential key features that a client would care about.
      
      Return the result in strictly valid JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AIInsightResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Our AI is currently taking a break. Please explore the demo directly to learn more.",
      features: ["Live Demo Access", "Direct Support", "Documentation"]
    };
  }
};