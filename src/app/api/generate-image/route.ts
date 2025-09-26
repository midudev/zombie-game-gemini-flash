import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { GenerateImageRequest } from "@/lib/types";
import { DEFAULT_GAME, GAMES } from "@/lib/games";

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt, gameName }: GenerateImageRequest =
      await request.json();

    const prompt = GAMES[gameName].GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google("gemini-2.5-flash-image-preview"),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ["IMAGE"],
        },
      },
    });

    return NextResponse.json({ image: files[0] || null });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Error generating story" },
      { status: 500 }
    );
  }
}
