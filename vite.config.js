import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // This is the default alias
      '~': path.resolve(__dirname),         // Map "~" to the project root
      '@flowcore': path.resolve(__dirname, 'src/flow/core'), // Example for a top-level 'components' folder
      '@flowstate': path.resolve(__dirname, 'src/flow/stores/flowstate') // Example for a top-level 'components' folder
    }
  }
})
