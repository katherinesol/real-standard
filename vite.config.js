import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with these routes gets forwarded to Flask
      // allows session cookies to work cross-origin
      '/signup': 'http://localhost:5555',
      '/login': 'http://localhost:5555',
      '/logout': 'http://localhost:5555',
      '/check_session': 'http://localhost:5555',
      '/saved-products': 'http://localhost:5555',
    }
  }
})