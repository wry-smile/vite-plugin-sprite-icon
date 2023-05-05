import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./main/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
})
