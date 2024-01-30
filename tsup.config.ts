import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  dts: true,
  format: ["esm", "cjs"],
  outDir: "dist",
  esbuildOptions(options) {
    options.external = ["react", "axios"];
  },
  external: ["react", "axios"],
});
