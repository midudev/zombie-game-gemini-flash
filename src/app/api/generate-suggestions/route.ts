import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GenerateSuggestionsRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { conversationHistory, currentSituation }: GenerateSuggestionsRequest = await request.json();
    console.log('Generate suggestions request:', { conversationHistory, currentSituation });

    const historyText = conversationHistory.map(
      (message) => `${message.role}: ${message.content}`
    ).join('\n');

    const prompt = `Eres un asistente de juego de supervivencia zombie. Basándote en la situación actual y el historial de la conversación, genera exactamente 3 sugerencias de acciones que el jugador puede tomar.

Historial de la conversación:
${historyText}

Situación actual: ${currentSituation}

Genera 3 sugerencias específicas y accionables que sean apropiadas para la situación actual. Cada sugerencia debe ser:
- Específica y clara
- Apropiada para el contexto de supervivencia zombie
- Variada (diferentes tipos de acciones: explorar, combatir, buscar recursos, etc.)
- Corta (máximo 8 palabras cada una)

Responde ÚNICAMENTE con las 3 sugerencias, una por línea, sin numeración ni formato adicional.`;

    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt
    });

    const suggestions = text.split('\n').filter(s => s.trim()).slice(0, 3);
    console.log('Generated suggestions:', suggestions);

    return NextResponse.json({ suggestions });
    
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json({ error: 'Error generating suggestions' }, { status: 500 });
  }
}
