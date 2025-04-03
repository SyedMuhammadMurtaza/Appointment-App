import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // https://vite.dev/config/
  plugins: [react()],
  base: './', // Ensure correct relative paths
})
