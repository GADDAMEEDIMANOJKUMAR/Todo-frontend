import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],


//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "https://todo-backend-2-ln1x.onrender.com",
//         changeOrigin: true,
//         secure: false,
//       },
//       "/api-docs": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
})
