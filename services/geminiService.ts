import { GoogleGenAI, Chat, Modality } from "@google/genai";
import { Magazine } from "../types";
import { MOCK_MAGAZINES } from "../constants";

const apiKey = process.env.API_KEY || '';

// Initialize client securely (assuming API_KEY is present)
const ai = new GoogleGenAI({ apiKey });

export const analyzeMagazine = async (magazine: Magazine): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key no configurada. Por favor configure process.env.API_KEY.";
  }

  try {
    const prompt = `
      Actúa como un historiador experto en revistas culturales latinoamericanas y europeas de principios del siglo XX.
      Analiza los siguientes metadatos de una revista histórica:

      Título: ${magazine.title}
      País: ${magazine.country}
      Año: ${magazine.year}
      Editor: ${magazine.publisher}
      Temas: ${magazine.topics.join(', ')}
      Descripción breve: ${magazine.description}

      Genera un breve informe de investigación (máximo 150 palabras) con el siguiente formato Markdown:
      
      ### Análisis Historiográfico
      [Un párrafo denso y académico sobre la importancia de esta revista en su contexto]

      ### Conexiones Sugeridas
      - [Sugerencia 1: Otra revista o autor relacionado]
      - [Sugerencia 2: Movimiento artístico relacionado]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Hubo un error al conectar con el asistente de investigación.";
  }
};

let chatSession: Chat | null = null;

export const sendMessageToBot = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key missing.";
  }

  if (!chatSession) {
    const magazineContext = MOCK_MAGAZINES.map(m => 
      `- ${m.title} (${m.year}, ${m.country}): ${m.description.es}. Temas: ${m.topics.join(', ')}`
    ).join('\n');

    const systemInstruction = `
Rol:
Eres el Asistente de Investigación Oficial del portal "Revistas Culturales 4.0", un proyecto de Humanidades Digitales de vanguardia enfocado en la prensa cultural histórica (1880-1950) de América Latina y Europa.

Tu Objetivo Principal:
Facilitar la investigación, el descubrimiento y el análisis de documentos históricos utilizando capacidades de IA semántica. Actúas como un bibliotecario especializado y un historiador digital.

Inventario del Archivo (Revistas Disponibles):
${magazineContext}

Capacidades y Jerarquía de Respuestas:

1. EXPERTO EN EL ARCHIVO (Prioridad Alta):
   - Responder dudas específicas sobre las revistas del inventario (fechas, editores, ideología).
   - Ayudar a encontrar revistas por tema (ej. "indigenismo", "vanguardia", "feminismo").
   - Explicar conexiones históricas entre las revistas (ej. "¿Qué relación hay entre Amauta y Boletín Titikaka?").

2. GUÍA DE HUMANIDADES DIGITALES (Prioridad Media):
   - Explicar qué es este portal (análisis de redes, visualización de datos, IA aplicada a archivos).
   - Asistir en la interpretación de los grafos o líneas de tiempo del "Laboratorio".

3. ASESORÍA METODOLÓGICA (Prioridad Baja - Solo si se solicita):
   - Solo si el usuario lo pide explícitamente, puedes dar consejos sobre cómo citar estos documentos o cómo formular un proyecto de investigación o creativo basado en ellos.

Estilo y Tono:
- Académico pero accesible, sofisticado.
- Riguroso con los datos históricos.
- Multilingüe: Responde SIEMPRE en el idioma del usuario (Español, Inglés o Alemán).
- Conciso: Los investigadores valoran la brevedad.

Reglas Críticas:
- NO alucines información sobre revistas que no están en tu contexto/inventario. Si te preguntan por una revista que no tienes, di: "Esa publicación no consta actualmente en nuestro índice digitalizado, pero puedo sugerirte similares como..."
- Mantén el foco en el periodo 1880-1950.
- Si te preguntan por temas fuera de la cultura/historia/humanidades, responde cortésmente que tu especialidad es el archivo de Revistas Culturales.
    `;

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Lower temperature for more accurate/academic responses
      },
    });
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Disculpa, no pude procesar tu solicitud.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Lo siento, tuve un problema técnico. ¿Podrías reformular tu pregunta?";
  }
};

// --- Text-to-Speech (TTS) Implementation ---

// Audio Decoding Helper Functions (Internal)
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

export const generateSpeech = async (text: string): Promise<void> => {
    if (!apiKey) {
      console.error("API Key not found for TTS");
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Aoede' }, // Options: Puck, Charon, Kore, Fenrir, Aoede, Zephyr
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio) {
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        const outputNode = outputAudioContext.createGain();
        outputNode.connect(outputAudioContext.destination);

        const audioBuffer = await decodeAudioData(
            decode(base64Audio),
            outputAudioContext,
            24000,
            1
        );

        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputNode);
        source.start();
      } else {
        console.warn("No audio data received from Gemini TTS");
      }

    } catch (error) {
      console.error("Error generating speech:", error);
    }
};