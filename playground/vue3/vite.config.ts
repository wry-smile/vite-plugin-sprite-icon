import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { spriteIcon } from '@wry-smile/vite-plugin-sprite-icon'
import inspest from 'vite-plugin-inspect'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), spriteIcon({ entry: resolve('./src/assets') }), inspest()],
})
