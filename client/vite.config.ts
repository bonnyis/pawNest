import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: "@", replacement: path.join(__dirname, "src")},
      {find: "@img", replacement: path.join(__dirname, "src/shared/assets/img")},
    ]
  },
})
