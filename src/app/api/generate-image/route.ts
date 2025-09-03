import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GAME_PROMPTS } from '@/lib/prompts'
import { GAME_CONFIG } from '@/lib/consts'
import { GenerateImageRequest, GenerateStoryRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt }: GenerateImageRequest = await request.json();

    const prompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ['IMAGE']
        }
      }
    })

    console.log('Generated images: ', files)

    return NextResponse.json({ image: files[0] || null });
    
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Error generating story' }, { status: 500 });
  }
}