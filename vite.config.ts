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
    strictPort: true,
    allowedHosts: true,
    headers: {
      'Content-Security-Policy': "frame-ancestors *",
    },
    hmr: {
      host: 'localhost',
      clientPort: 3333,
      overlay: false,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
    ],
  },
  build: {
    outDir: 'dist',
  },
})
