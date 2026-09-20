import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// On GitHub Pages the site is served from https://<user>.github.io/AURELIE-Frontend/,
// so production assets must be prefixed with the repo name. Dev keeps "/".
// `command` is "build" for `vite build` and "serve" for `vite dev`.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/AURELIE-Frontend/" : "/",
}));
