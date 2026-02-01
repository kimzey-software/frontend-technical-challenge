import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      '/api-dev': {
        target: 'https://glaziersonline.com:3210',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
  },
})
