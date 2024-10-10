import { defineConfig } from "vite";
import type { UserConfig } from "vite";

export default defineConfig({
    base: '/microplus/',
    build: {
        outDir: 'docs'
    }
}) satisfies UserConfig