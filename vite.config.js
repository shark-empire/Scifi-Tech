import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment and modify the line below if deploying to a sub-folder repository:
   base: '/Scifi-Tech/', 
})
