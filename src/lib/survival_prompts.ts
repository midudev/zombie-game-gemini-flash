export const SURVIVAL_GAME_PROMPTS = {
  INITIAL_STORY: `Eres el narrador de un juego de supervivencia medieval con elementos de fantasía oscura. El mundo está plagado de hambrunas, enfermedades, demonios y criaturas sobrenaturales.

Genera la escena inicial donde el jugador despierta en este mundo hostil. Describe la situación en MÁXIMO 2 párrafos breves y cortos, incluyendo detalles sensoriales (olores, sonidos, sensaciones) y algún elemento que sugiera peligro inminente o necesidad de supervivencia (hambre, frío, heridas o amenazas cercanas).

Sé conciso pero inmersivo. Termina SIEMPRE con una pregunta directa como "¿Qué decides hacer ahora?", "¿Hacia dónde te diriges?", o "¿Cómo piensas sobrevivir?".

IMPORTANTE: Al final, SIEMPRE incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una imagen medieval, magica y realista de la escena inicial (máximo 50 palabras). Esta línea es OBLIGATORIA.`,

  CONTINUE_STORY: (
    historyText: string,
    userMessage: string
  ) => `Eres el narrador de un juego de supervivencia medieval con magia, demonios y criaturas sobrenaturales. El hambre, las enfermedades y los peligros acechan constantemente.

Historial de la conversación:
${historyText}

El jugador acaba de decir: "${userMessage}"

Continúa la historia basándote en esta acción. En MÁXIMO 2 párrafos, describe consecuencias realistas y elementos de supervivencia (recursos, clima, estado físico). Si corresponde, introduce sutilmente elementos sobrenaturales o peligros. Las decisiones del jugador deben tener consecuencias tangibles, positivas o negativas.

Termina SIEMPRE con una pregunta directa sobre su próxima acción.
IMPORTANTE: Al final, SIEMPRE incluye una línea separada que comience EXACTAMENTE con "IMAGEN:" seguida de una descripción breve en inglés para generar una imagen medieval, magica y realista de la nueva escena (máximo 50 palabras). Esta línea es OBLIGATORIA.`,

  GENERATE_IMAGE: (description: string) =>
    `Generate a hyper-realistic medieval fantasy survival scene: ${description}. Use dramatic lighting, photorealistic textures, weathered materials, and authentic period details. Include subtle magical elements if relevant. Style: cinematic 16:9 aspect ratio with muted color palette and atmospheric depth. Reference artists: Greg Rutkowski, Jakub Rozalski.`,
};
