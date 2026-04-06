import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        host: true,
        strictPort: true,
    },
    build: {
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;
                    if (id.includes("react") || id.includes("scheduler")) return "vendor-react";
                    if (id.includes("react-router-dom")) return "vendor-router";
                    if (id.includes("@mui") || id.includes("@emotion")) return "vendor-mui";
                    if (id.includes("@nextui-org")) return "vendor-nextui";
                    if (id.includes("@tremor") || id.includes("recharts")) return "vendor-charts";
                    if (id.includes("framer-motion")) return "vendor-motion";
                    if (id.includes("@remixicon") || id.includes("react-icons")) return "vendor-icons";
                    return "vendor-misc";
                },
            },
        },
    },
});
