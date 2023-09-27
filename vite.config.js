import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@helpers': '/src/helpers',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@sections': '/src/sections',
      '@theme': '/src/theme',
      '@utils': '/src/utils',
    }
  }
})
