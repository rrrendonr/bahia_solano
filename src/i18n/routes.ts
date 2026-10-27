import { locales, type Locale } from './config';

/**
 * Slugs traducidos por idioma. La clave es el identificador interno de la página.
 * Cambiar un slug aquí actualiza el menú, el selector de idioma, hreflang y canonical.
 */
export const routes = {
	home: { es: '', en: '' },
	about: { es: 'sobre-nosotros', en: 'about-us' },
	tours: { es: 'tours', en: 'tours' },
	contact: { es: 'contacto', en: 'contact' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/**
 * Páginas que genera la ruta dinámica src/pages/[lang]/[...slug].astro.
 * Al implementar una página nueva: agregar su clave aquí y su vista en ese archivo.
 */
export const dynamicPages = ['about', 'tours', 'contact'] as const satisfies readonly RouteKey[];
export type DynamicPageKey = (typeof dynamicPages)[number];

/** Construye una ruta localizada con barra final: /es/sobre-nosotros/ */
export function localizePath(key: RouteKey, lang: Locale, ...extra: (string | undefined)[]): string {
	const parts = [lang, routes[key][lang], ...extra].filter(Boolean);
	return `/${parts.join('/')}/`;
}

/**
 * Rutas equivalentes en cada idioma, usadas para hreflang y el selector de idioma.
 * `extra` permite subrutas traducidas, p. ej. el slug de un tour por idioma.
 */
export function getAlternates(
	key: RouteKey,
	extra?: Partial<Record<Locale, string>>,
): Record<Locale, string> {
	return Object.fromEntries(
		locales.map((lang) => [lang, localizePath(key, lang, extra?.[lang])]),
	) as Record<Locale, string>;
}
