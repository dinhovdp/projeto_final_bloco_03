import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // IMPORTANTE: Nova importação do Tailwind v4

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // IMPORTANTE: Ativação do plugin do Tailwind v4
  ],
})
