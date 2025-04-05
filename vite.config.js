import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // This is the default alias
      '~': path.resolve(__dirname),         // Map "~" to the project root
      '@sesameflow': path.resolve(__dirname,'src/components/index/'),
      '@flow': path.resolve(__dirname, 'src/flow/'),
      '@flowcore': path.resolve(__dirname, 'src/flow/core/'), 
      '@flowstate': path.resolve(__dirname, 'src/flow/stores/state-store/') 
    }
  }
})
