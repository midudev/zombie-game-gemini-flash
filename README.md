# 🧟 Zombie Game - Aventura de Supervivencia con IA

> **Un proyecto de [midudev](https://midu.dev)** - Creador de contenido especializado en programación y desarrollo web

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

### 🌐 Sígueme en mis redes sociales
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/midudev)
[![Twitch](https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white)](https://twitch.tv/midudev)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/midudev)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/midu.dev)

---

Un juego de aventura conversacional de supervivencia zombie con narrativa generada por IA y gráficos en estilo pixel art. Cada decisión que tomes influirá en tu historia de supervivencia en un mundo post-apocalíptico.

**Este proyecto forma parte del contenido educativo de midudev**, donde exploramos las últimas tecnologías web y las posibilidades de la Inteligencia Artificial en el desarrollo de aplicaciones interactivas.

## 🎮 Características

- **Narrativa Generada por IA**: Cada historia es única gracias a Google Gemini
- **Imágenes Dinámicas**: Visuales en estilo pixel art generadas automáticamente
- **Aventura Conversacional**: Interactúa usando lenguaje natural
- **Supervivencia Zombie**: Toma decisiones críticas para sobrevivir
- **Interfaz Moderna**: UI responsive y elegante con TailwindCSS
- **AI-Native Components**: Construido con [AI Elements](https://ai-sdk.dev/elements/overview), la librería de componentes especializada en aplicaciones de IA

## 🚀 Demo

¡Experimenta el apocalipsis zombie como nunca antes! Cada partida es una aventura completamente diferente.

## 🛠️ Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) con Turbopack
- **Frontend**: [React 19](https://reactjs.org/) con TypeScript
- **Estilos**: [TailwindCSS 4](https://tailwindcss.com/)
- **IA**: [Google Gemini](https://ai.google.dev/) para narrativa e imágenes
- **UI Components**: [AI Elements](https://ai-sdk.dev/elements/overview) de Vercel
- **Linting**: [Biome](https://biomejs.dev/)

## 📦 Instalación

1. **Clona el repositorio**
   
```bash
git clone https://github.com/midudev/zombie-game.git
cd zombie-game
```

2. **Instala las dependencias**
   
```bash
pnpm install
```

3. **Configura las variables de entorno**
   
```bash
cp .env.example .env.local
```
   
Añade tu clave de API de Google AI:
   
```env
GOOGLE_GENERATIVE_AI_API_KEY=tu_clave_aqui
```

4. **Inicia el servidor de desarrollo**

```bash
pnpm dev
```

5. **Abre tu navegador**

Visita [http://localhost:3000](http://localhost:3000) y comienza tu aventura de supervivencia.

## 🎯 Cómo Jugar

1. **Inicio**: El juego comenzará automáticamente con una escena inicial del apocalipsis zombie
2. **Interactúa**: Describe qué quieres hacer, adónde ir, qué examinar o cómo reaccionar
3. **Sobrevive**: Cada decisión afectará tu historia y tus posibilidades de supervivencia
4. **Explora**: El mundo se genera dinámicamente basado en tus acciones

### Ejemplos de Acciones

- "Busco un arma en la habitación"
- "Me dirijo hacia la salida de emergencia"
- "Examino los sonidos que vienen del pasillo"
- "Intento comunicarme con otros supervivientes"

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── generate-image/     # Generación de imágenes con IA
│   │   └── generate-story/     # Generación de narrativa con IA
│   ├── componentes/
│   │   ├── game-input.tsx      # Input del jugador
│   │   ├── game-loader.tsx     # Indicador de carga
│   │   └── game-message.tsx    # Mensajes del juego
│   ├── hooks/
│   │   └── use-zombie-game.ts  # Lógica principal del juego
│   └── page.tsx                # Página principal
├── components/
│   └── ui/                     # Componentes UI reutilizables
└── lib/
    ├── consts.ts              # Constantes del juego
    ├── prompts.ts             # Prompts para la IA
    ├── types.ts               # Tipos TypeScript
    └── utils.ts               # Utilidades
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter con Biome
- `pnpm format` - Formatea el código con Biome

## 🌟 Características Técnicas

- **Server Components**: Aprovecha las últimas características de React 19
- **Streaming**: Respuestas de IA en tiempo real
- **Optimización**: Turbopack para builds ultrarrápidos
- **AI-First Design**: Componentes nativos para IA con AI Elements de Vercel
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Type Safety**: TypeScript estricto para mayor confiabilidad

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Miguel Ángel Durán** - [@midudev](https://github.com/midudev)

Creador de contenido especializado en programación y desarrollo web con una comunidad de más de 1 millón de desarrolladores en YouTube y otras plataformas.

### 🌐 Más redes sociales

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/midudev)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@midudev)

### 💖 Apoyo

Si te gusta este proyecto, puedes apoyar mi trabajo:

[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/midudev)
[![GitHub Sponsors](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/midudev)

---

<div align="center">

**¿Sobrevivirás al apocalipsis zombie? 🧟‍♂️**

*Desarrollado con ❤️ por [midudev](https://midu.dev)*

</div>