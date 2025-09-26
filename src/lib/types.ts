import { GAMES } from "./games";

export interface GameMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: GeneratedImage;
  imageLoading?: boolean;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
  uint8ArrayData?: Uint8Array;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateStoryRequest {
  userMessage: string;
  conversationHistory: ConversationMessage[];
  isStart: boolean;
  gameName: GameType;
}

export interface GenerateImageRequest {
  imagePrompt: string;
  gameName: GameType;
}

export interface GenerateStoryResponse {
  narrative: string;
  imagePrompt: string;
}

export type GameType = keyof typeof GAMES;
