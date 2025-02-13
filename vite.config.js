// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { glslify } from "vite-plugin-glslify";
import gltf from "vite-plugin-gltf";
import sassGlobImports from "vite-plugin-sass-glob-import";

export default defineConfig({
  root: "src",
  base: "/webgl-works-31/",
  publicDir: resolve(__dirname, "public"),
  plugins: [
    sassGlobImports(),
    glslify(),
    gltf({ include: ["**/*.gltf", "**/*.glb"] }),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsInclude: ["**/*.gltf", "**/*.glb"],
  },
});
