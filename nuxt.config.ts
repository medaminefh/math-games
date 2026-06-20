import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@nuxtjs/i18n",
		"@vueuse/nuxt",
		"@nuxtjs/google-fonts",
	],

	i18n: {
		locales: [
			{ code: "en", iso: "en-US", dir: "ltr", file: "en.json" },
			{ code: "fr", iso: "fr-FR", dir: "ltr", file: "fr.json" },
			{ code: "ar", iso: "ar-SA", dir: "rtl", file: "ar.json" },
		],
		defaultLocale: "en",
		strategy: "prefix_except_default",
		langDir: "locales",
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: "i18n_redirected",
			redirectOn: "root",
		},
	},

	googleFonts: {
		families: {
			Nunito: [400, 600, 700, 800, 900],
			Quicksand: [400, 600, 700],
		},
		display: "swap",
	},

	app: {
		baseURL: process.env.NODE_ENV === "production" ? "/math-games/" : "/",
		head: {
			titleTemplate: "%s - Math Games",
			title: "Kids Math",
			meta: [
				{
					name: "description",
					content: "Fun and educational math games for kids.",
				},
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no",
				},
				{ name: "mobile-web-app-capable", content: "yes" },
				{ name: "apple-mobile-web-app-capable", content: "yes" },
				{ name: "apple-mobile-web-app-status-bar-style", content: "default" },
				{ name: "theme-color", content: "#FF5722" },
			],
			link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
		},
	},

	css: ["~/assets/css/main.css"],

	compatibilityDate: "2024-06-20",
});
