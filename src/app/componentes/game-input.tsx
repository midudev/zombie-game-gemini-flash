import {
  PromptInput,
  PromptInputBody,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { UI_MESSAGES } from "@/lib/consts";
import { DEFAULT_GAME, GAME_OPTIONS } from "@/lib/games";
import { GameType } from "@/lib/types";

interface GameInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onSelectGameChange: (value: GameType) => void;
  gameName?: GameType;
}

export function GameInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  onSelectGameChange,
  gameName,
}: GameInputProps) {
  const inputTrimmed = input.trim();
  const inputSubmitIsDisabled = isLoading || inputTrimmed === "";

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  const handleSelectGameChange = (value: GameType) => {
    onSelectGameChange(value);
  };

  return (
    <PromptInput onSubmit={onSubmit} className="relative">
      <PromptInputBody>
        <PromptInputTextarea
          placeholder={UI_MESSAGES.PLACEHOLDERS.INPUT}
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </PromptInputBody>

      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputModelSelect
            onValueChange={handleSelectGameChange}
            defaultValue={gameName}
          >
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue defaultValue={gameName} />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {GAME_OPTIONS.map((game) => (
                <PromptInputModelSelectItem key={game.value} value={game.value}>
                  {game.label}
                </PromptInputModelSelectItem>
              ))}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
        <PromptInputSubmit disabled={inputSubmitIsDisabled} />
      </PromptInputToolbar>
    </PromptInput>
  );
}
