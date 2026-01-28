
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DetailedStateInfo, PlaceSuggestion, GroundingSource, QuizQuestion } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Genera un set de preguntas de quiz sobre Venezuela para niños de 6to grado.
 */
export async function generateQuizQuestions(): Promise<QuizQuestion[]> {
  const ai = getAI();
  const prompt = `Genera un cuestionario educativo de 5 preguntas sobre la geografía, estados, capitales, economía y cultura de Venezuela. 
  El nivel debe ser para niños de 6to grado (11-12 años).
  Asegúrate de incluir:
  - Una pregunta sobre capitales.
  - Una pregunta sobre un recurso económico (petróleo, oro, etc).
  - Una pregunta sobre un monumento natural.
  - Dos preguntas de cultura o curiosidades generales.
  Cada pregunta debe tener 4 opciones y una explicación breve de por qué la respuesta es correcta.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswerIndex", "explanation"]
        }
      }
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Error parsing quiz questions", e);
    return [];
  }
}

/**
 * Uses Gemini 3 Flash Preview with Google Search Grounding to get deep info on a state.
 */
export async function fetchStateDetails(stateName: string): Promise<DetailedStateInfo> {
  const ai = getAI();
  const prompt = `Proporciona información educativa para niños de 6to grado sobre el estado ${stateName} de Venezuela. 
  Divide la respuesta en: 
  1. Aspectos Sociales (Población, cultura, tradiciones).
  2. Aspectos Económicos (Recursos naturales, industrias principales).
  3. Aspectos Políticos (Gobernación, municipios, relevancia histórica).
  4. Una noticia o dato curioso reciente del estado.
  
  Sé claro, didáctico y usa un lenguaje amigable.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const text = response.text || "No se pudo obtener información detallada.";
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources: GroundingSource[] = chunks
    .filter((c: any) => c.web)
    .map((c: any) => ({
      title: c.web.title,
      uri: c.web.uri
    }));

  const sections = text.split(/\d\.\s/);
  
  return {
    social: sections[1] || "Información social pendiente.",
    economic: sections[2] || "Información económica pendiente.",
    political: sections[3] || "Información política pendiente.",
    currentNews: sections[4] || "Sin noticias recientes.",
    sources: sources
  };
}

/**
 * Uses Gemini 2.5 Flash with Google Maps Grounding to suggest places to visit.
 */
export async function fetchMapPlaces(stateName: string, coords?: { lat: number, lng: number }): Promise<PlaceSuggestion[]> {
  const ai = getAI();
  const prompt = `¿Qué lugares turísticos, museos o monumentos históricos hay en el estado ${stateName}, Venezuela?`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: coords ? {
        retrievalConfig: {
          latLng: {
            latitude: coords.lat,
            longitude: coords.lng
          }
        }
      } : undefined
    },
  });

  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return chunks
    .filter((c: any) => c.maps)
    .map((c: any) => ({
      name: c.maps.title,
      uri: c.maps.uri,
      snippet: c.maps.placeAnswerSources?.[0]?.reviewSnippets?.[0]
    }));
}

/**
 * Uses Gemini 2.5 Flash Image to edit a photo.
 */
export async function editStateImage(base64Image: string, prompt: string): Promise<string | null> {
  const ai = getAI();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: 'image/png',
          },
        },
        {
          text: `Edita esta imagen siguiendo esta instrucción: ${prompt}. Mantén la esencia del paisaje venezolano pero añade el efecto solicitado.`,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return null;
}

/**
 * Helper to chat with the assistant about Venezuela.
 */
export async function chatAboutVenezuela(message: string, history: {role: 'user' | 'model', text: string}[]): Promise<{text: string, sources: GroundingSource[]}> {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "Eres un guía turístico virtual experto en Venezuela llamado 'Churuata'. Tu misión es enseñar a niños de 6to grado sobre la geografía e historia del país de forma divertida y educativa. Siempre usa Google Search para verificar datos recientes.",
      tools: [{ googleSearch: {} }],
    }
  });

  const response = await chat.sendMessage({ message });
  
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = chunks
    .filter((c: any) => c.web)
    .map((c: any) => ({
      title: c.web.title,
      uri: c.web.uri
    }));

  return {
    text: response.text || "Lo siento, tuve un problema al procesar tu pregunta.",
    sources
  };
}
