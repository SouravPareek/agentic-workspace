import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({ 
    plugins: [react()],
    //if any request on frontend starting with /api route then transfer it to http://localhost:3000
    server:{
        port: 5173,
        proxy:{
            '/api':{
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
