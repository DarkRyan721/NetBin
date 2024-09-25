import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://netbin.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Elimina el prefijo '/api'
      }
    }
  }
})