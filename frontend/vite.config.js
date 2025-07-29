import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Final production config
export default defineConfig({
  plugins: [react()],
})
