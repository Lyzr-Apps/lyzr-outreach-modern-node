import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3333,
    allowedHosts: true,
    headers: {
      'Content-Security-Policy': "frame-ancestors *",
    },
    hmr: {
      host: 'localhost',
      clientPort: 3333,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
  },
})
