import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cover': path.resolve(__dirname, './src/assets/covermusic'),
      '@mp3': path.resolve(__dirname, './src/assets/music'),
    },
  },
})
