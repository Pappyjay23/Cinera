import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			strategies: "injectManifest",
			srcDir: "src",
			filename: "service-worker.ts",
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"app-bg.jpg",
				"offline.html",
			],
			manifest: {
				name: "Cinera",
				short_name: "Cinera",
				description:
					"Immerse yourself in cinema. Stream, track, and discover your next favorite film with Cinera.",
				start_url: "/",
				display: "standalone",
				background_color: "#010b0b",
				theme_color: "#010b0b",
				orientation: "portrait",
				icons: [
					{
						src: "/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/maskable_icon_x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/maskable_icon_x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
	// === Server tunneling ===
	// server: {
	// 	host: "0.0.0.0",
	// 	port: 5173,
	// 	hmr: {
	// 		clientPort: 443,
	// 	},
	// 	allowedHosts: [
	// 		".trycloudflare.com",
	// 	],
	// },
	// === End ===
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
