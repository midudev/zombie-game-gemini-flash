'use client'

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/conversation";
import { GameInput } from "./componentes/game-input";
import { GameLoader } from "./componentes/game-loader";
import { GameMessage } from "./componentes/game-message";
import { useZombieGame } from "./hooks/use-zombie-game";
import { useColorExtractor } from "@/app/hooks/color-extractor";
import { useState, useEffect, useRef } from "react";
import { type GameMessage as GameMessageType } from "@/lib/types";

export default function Home() {
  const { messages, input, isLoading, startGame, handleSubmit, handleInputChange } = useZombieGame();
  const [image, setImage] = useState<string | undefined>('');
  const lastMessageRef = useRef<GameMessageType | null>(null);
  useColorExtractor(image);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      
      if (latestMessage !== lastMessageRef.current && 
          latestMessage.image?.base64Data && 
          !latestMessage.imageLoading) {
        
        setImage(latestMessage.image.base64Data);
        lastMessageRef.current = latestMessage;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && !image) {
      const firstMessage = messages[0];
      if (firstMessage.image && !firstMessage.imageLoading) {
        setImage(firstMessage.image.base64Data);
      }
    }
  }, [messages, image]);


  return (
    <div className="font-sans h-screen mx-auto overflow-hidden bg-gradient-to-t from-[var(--color-gradient-principal)] to-[var(--color-gradient-secondary)]">
      
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent className="max-w-xl mx-auto">
            {
              messages.map(message => (
                <GameMessage key={message.id} message={message} />
              ))
            }
            {isLoading && <GameLoader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="max-w-2xl w-full mx-auto pb-4">
          <GameInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
