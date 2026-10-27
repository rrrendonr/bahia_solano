export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeMeta: Record<
	Locale,
	{ label: string; short: string; htmlLang: string; ogLocale: string; hreflang: string }
> = {
	es: { label: 'Español', short: 'ES', htmlLang: 'es-CO', ogLocale: 'es_CO', hreflang: 'es' },
	en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', hreflang: 'en' },
};

export function isLocale(value: unknown): value is Locale {
	return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** getStaticPaths compartido para cualquier página bajo src/pages/[lang]/ */
export function getLangStaticPaths() {
	return locales.map((lang) => ({ params: { lang } }));
}
