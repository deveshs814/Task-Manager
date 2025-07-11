import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Optional (default is 'dist', included for clarity)
  },
  server: {
    port: 5173, // for local dev
  },
  base: '/', // ensures correct asset loading in Render static hosting
})
