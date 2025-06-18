import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  target: 'esnext',
  outDir: 'dist',
  dts: true,
  sourcemap: true,
  clean: true,
})
