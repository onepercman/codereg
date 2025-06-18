import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  target: "esnext",
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
  async onSuccess() {
    // Copy schema file to dist
    const { copyFile } = await import("fs/promises")
    await copyFile("src/schema/config.schema.json", "dist/config.schema.json")
  },
})
