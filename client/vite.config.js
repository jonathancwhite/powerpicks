import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": "http://jcwdev.local:8000",
		},
		host: "jcwdev.local",
	},
});
