import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-animations': ['framer-motion', 'gsap'],
                    'vendor-icons': ['lucide-react']
                }
            }
        },
        minify: 'esbuild'
    },
    assetsInclude: ['**/*.webp', '**/*.avif']
})
