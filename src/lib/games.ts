import { SURVIVAL_GAME_PROMPTS } from "./survival_prompts";
import { ZOMBIE_GAME_PROMPTS } from "./zombie_prompts";

export const DEFAULT_GAME = "ZOMBIE_HISTORY";

export const GAMES = {
  ZOMBIE_HISTORY: ZOMBIE_GAME_PROMPTS,
  SURVIVAL_HISTORY: SURVIVAL_GAME_PROMPTS,
};

export const GAME_OPTIONS = Object.keys(GAMES).map((key) => ({
  value: key,
  label: key
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()),
}));
