import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you publish to a sub-folder (e.g. https://user.github.io/invite/),
// add:  base: '/invite/'
export default defineConfig({
  plugins: [react()],
})
