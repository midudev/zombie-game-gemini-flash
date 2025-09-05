import { useState, useEffect } from 'react';

type RGB = { r: number; g: number; b: number };

export function useColorExtractor (base64Image: string | undefined | null) {
  const [variedColors, setVariedColors] = useState<Array<string> | null>(null);

  useEffect(() => {
    if (!base64Image) return;

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const data = ctx?.getImageData(0, 0, canvas.width, canvas.height)?.data;

        if (!data?.length) return;

        // Extract all unique colors (simplified)
        const colorSet = new Set<string>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Use rounded values to avoid too many near-duplicates
          const key = `${Math.floor(r / 32) * 32},${Math.floor(g / 32) * 32},${Math.floor(b / 32) * 32}`;
          colorSet.add(key);
        }

        // Convert Set of keys back into RGB strings
        const uniqueColors: Array<RGB> = [];
        colorSet.forEach((key) => {
          const [r, g, b] = key.split(',').map(Number);
          uniqueColors.push({ r, g, b });
        });

        console.log(uniqueColors);
        // Sort colors based on perceived brightness or hue to get variety
        const sortedByVariety = [...uniqueColors].sort((a, b) => {
          // Simple heuristic: prioritize larger differences in RGB space (could be improved)
          return (
            Math.abs(a.r - b.r) +
            Math.abs(a.g - b.g) +
            Math.abs(a.b - b.b)
          );
        });

        // Take first {n} most varied colors
        const topVariedColors = sortedByVariety.slice(0, 4).map(({ r, g, b }) => `rgb(${r}, ${g}, ${b})`);

        setVariedColors(topVariedColors);

        // Original dominant color logic (you can keep this for reference)
        const colorCount: any = {};
        let totalPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const key = `${Math.floor(r / 32) * 32},${Math.floor(g / 32) * 32},${Math.floor(b / 32) * 32}`;

          if (!colorCount[key]) colorCount[key] = 0;
          colorCount[key]++;
          totalPixels++;
        }

      } catch (error) {
        console.error('Error processing image:', error);
      }
    };

    img.onerror = () => {
      console.error('Failed to load image');
    };

    img.src = `data:image/png;base64,${base64Image}`;
  }, [base64Image]);

  if (variedColors) {
    console.log('variedColors');
    console.log(variedColors);
    document.documentElement.style.setProperty('--color-gradient-principal', variedColors[0]);
    document.documentElement.style.setProperty('--color-gradient-secondary', variedColors[1]);
  }

  return { variedColors };
};


