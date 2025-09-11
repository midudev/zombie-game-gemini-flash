import { useState, useEffect } from "react";
import type { GameMessage, GameType, GenerateStoryResponse } from "@/lib/types";
import { DEFAULT_GAME } from "@/lib/games";

export function useZombieGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameName, setGameName] = useState<GameType>(DEFAULT_GAME);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    startGame();
  }, [gameName]);

  const startGame = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({ isStart: true, gameName }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const newMessage: GameMessage = {
        id: messageId,
        role: "assistant",
        content: data.narrative,
        imageLoading: true,
      };

      setMessages([newMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (messageId: string, imagePrompt: string) => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({
          imagePrompt,
          gameName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const imageData = await response.json();

      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === messageId) {
            return { ...message, image: imageData.image, imageLoading: false };
          }

          return message;
        })
      );
    } catch {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {
          if (message.id === messageId) {
            return { ...message, imageLoading: false };
          }

          return message;
        })
      );
    }
  };

  const submitUserMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setIsLoading(true);
    setInput("");
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStart: false,
          gameName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const assistantMessage: GameMessage = {
        id: messageId,
        role: "assistant",
        content: data.narrative,
        imageLoading: true,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      generateImage(messageId, data.imagePrompt);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSelectGameChange = (value: GameType) => {
    setMessages([]);
    setInput("");
    setGameName(value);
  };

  return {
    messages,
    input,
    isLoading,
    startGame,
    submitUserMessage,
    handleInputChange,
    handleSelectGameChange,
    gameName,
  };
}
