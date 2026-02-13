import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from "@tanstack/router-plugin/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tanstackRouter({
		target: 'react',
		autoCodeSplitting: true
	}), devtools(), viteReact(), tailwindcss()],
	test: {
		environment: "jsdom"
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
