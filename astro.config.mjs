// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: reemplazar por el dominio definitivo cuando esté disponible.
const SITE_URL = 'https://bahiasolanopesca.com';

export default defineConfig({
	site: SITE_URL,

	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: {
			// Ambos idiomas llevan prefijo: /es/... y /en/...
			prefixDefaultLocale: true,
			// La raíz "/" la maneja src/pages/index.astro (redirección a /es/).
			redirectToDefaultLocale: false,
		},
	},

	// Fuentes auto-alojadas: Astro las descarga en el build y las sirve desde el propio dominio.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Barlow Condensed',
			cssVariable: '--font-display',
			weights: [600, 700, 800],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Source Sans 3',
			cssVariable: '--font-body',
			weights: [400, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
	],

	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es', en: 'en' },
			},
			// La raíz solo redirige a /es/, no se indexa.
			filter: (page) => page !== `${SITE_URL}/`,
		}),
	],
});
