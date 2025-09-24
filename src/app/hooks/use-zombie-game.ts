import { useState, useEffect, use } from 'react';
import type { GameMessage, ConversationMessage, GenerateStoryResponse, GenerateSuggestionsResponse } from '@/lib/types';

export function useZombieGame() {
  const [messages, setMessages] = useState<GameMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  
  useEffect(() => {
    startGame()
  }, [])

  const startGame = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({ isStart: true })
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }
  
      const data = await response.json() as GenerateStoryResponse

      const messageId = crypto.randomUUID()

      const newMessage: GameMessage = {
        id: messageId,
        role: 'assistant',
        content: data.narrative,
        imageLoading: true
      }

      setMessages([newMessage])
      generateImage(messageId, data.imagePrompt)
      
      // Generar sugerencias después del mensaje inicial
      setTimeout(() => {
        generateSuggestions([newMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateImage = async (messageId: string, imagePrompt: string) => {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        body: JSON.stringify({
          imagePrompt: imagePrompt
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }
  
      const imageData = await response.json()
  
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return { ...message, image: imageData.image, imageLoading: false }
        }
  
        return message
      }))
    } catch (error) {
      setMessages(prevMessages => prevMessages.map(message => {
        if (message.id === messageId) {
          return { ...message, imageLoading: false }
        }

        return message
      }))
    }
  }

  const generateSuggestions = async (currentMessages?: GameMessage[]) => {
    const messagesToUse = currentMessages || messages;
    if (messagesToUse.length === 0) return;

    setSuggestionsLoading(true);
    
    try {
      const conversationHistory = messagesToUse.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const currentSituation = messagesToUse[messagesToUse.length - 1]?.content || '';

      const response = await fetch('/api/generate-suggestions', {
        method: 'POST',
        body: JSON.stringify({
          conversationHistory,
          currentSituation
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json() as GenerateSuggestionsResponse;
      console.log('Generated suggestions:', data.suggestions);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setSuggestionsLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Limpiar sugerencias cuando el usuario envía un mensaje manualmente
    setSuggestions([]);

    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input
    }

    setIsLoading(true)
    setInput('')
    setMessages(prevMessages => [...prevMessages, userMessage])

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStart: false
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const data = await response.json() as GenerateStoryResponse
      
      const messageId = crypto.randomUUID()

      const assistantMessage: GameMessage = {
        id: messageId,
        role: 'assistant',
        content: data.narrative,
        imageLoading: true
      }

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, assistantMessage];
        // Generar sugerencias después de la respuesta del asistente
        setTimeout(() => {
          generateSuggestions(updatedMessages);
        }, 1000);
        return updatedMessages;
      })
      generateImage(messageId, data.imagePrompt)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSuggestionClick = async (suggestion: string) => {
    // Limpiar sugerencias inmediatamente
    setSuggestions([]);
    
    // Crear mensaje del usuario
    const userMessage: GameMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: suggestion
    }

    setIsLoading(true)
    setMessages(prevMessages => [...prevMessages, userMessage])

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        body: JSON.stringify({
          userMessage: suggestion,
          conversationHistory: messages,
          isStart: false
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const data = await response.json() as GenerateStoryResponse
      
      const messageId = crypto.randomUUID()

      const assistantMessage: GameMessage = {
        id: messageId,
        role: 'assistant',
        content: data.narrative,
        imageLoading: true
      }

      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, assistantMessage];
        // Generar nuevas sugerencias después de la respuesta del asistente
        setTimeout(() => {
          generateSuggestions(updatedMessages);
        }, 1000);
        return updatedMessages;
      })
      generateImage(messageId, data.imagePrompt)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return { 
    messages, 
    input, 
    isLoading, 
    suggestions, 
    suggestionsLoading,
    startGame, 
    handleSubmit, 
    handleInputChange, 
    handleSuggestionClick,
    generateSuggestions 
  }
}