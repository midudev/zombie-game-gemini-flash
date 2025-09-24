import { Button } from '@/components/ui/button';

interface GameSuggestionsProps {
	suggestions: string[];
	onSuggestionClick: (suggestion: string) => void;
	isLoading?: boolean;
}

export function GameSuggestions({ suggestions, onSuggestionClick, isLoading }: GameSuggestionsProps) {
	console.log('GameSuggestions render:', { suggestions, isLoading });

	if (isLoading) {
		return (
			<div className="flex gap-2">
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg px-4 py-2 h-8 w-24"
					/>
				))}
			</div>
		);
	}

	return (
		<div className="flex gap-2 ">
			{suggestions.map((suggestion, index) => (
				<Button
					key={index}
					variant="outline"
					size="sm"
					onClick={() => onSuggestionClick(suggestion)}
					className="text-xs bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
				>
					{suggestion}
				</Button>
			))}
		</div>
	);
}
