// vite.config.js
import { defineConfig } from 'vite'
import { glslify } from "vite-plugin-glslify";
import gltf from 'vite-plugin-gltf';
import sassGlobImports from "vite-plugin-sass-glob-import";

export default defineConfig({
  root: "src",
  plugins: [
    sassGlobImports(),
    glslify(),
    gltf({ include: ["**/*.gltf", '**/*.glb'] }),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsInclude: ['*.gltf', '*.glb'],
  },
})