import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        // Type-check and lint in the background during `npm run dev`.
        // `npm run build` already runs `tsc -b`, so skip it there.
        checker({ typescript: { buildMode: true }, oxlint: true, enableBuild: false }),
    ],
});
