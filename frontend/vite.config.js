import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      onwarn(warning, warn) {
        // Suppress the specific externalization warning
        if (
          warning.message.includes(
            "If you do want to externalize this module explicitly add it to",
          )
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
