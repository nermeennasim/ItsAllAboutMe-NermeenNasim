import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into their own chunk
          vendor: ['react', 'react-dom'],
          // Animation libraries
          animations: ['framer-motion', 'react-intersection-observer'],
          // Icons - if using react-icons
          icons: ['react-icons'],
        },
      },
    },
    // Increase the chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
})
