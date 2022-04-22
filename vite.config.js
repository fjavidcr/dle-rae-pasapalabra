import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'index.html',
      formats: ['es']
    },
    rollupOptions: {
    }
  },
  plugins: [splitVendorChunkPlugin()]
})
