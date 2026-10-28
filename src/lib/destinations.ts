import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { localizePath } from '../i18n/routes';

export type Destination = CollectionEntry<'destinations'>;

/** Destinos ordenados por el campo `order` */
export async function getDestinations(): Promise<Destination[]> {
	return (await getCollection('destinations')).sort((a, b) => a.data.order - b.data.order);
}

/** /es/tours/chile/ */
export function destinationPath(lang: Locale, id: string): string {
	return localizePath('tours', lang, id);
}

/** Contacto con el destino preseleccionado: /es/contacto/?tour=chile */
export function destinationQuotePath(lang: Locale, id: string): string {
	return `${localizePath('contact', lang)}?tour=${encodeURIComponent(id)}`;
}

/** Muestra el valor o un marcador visible mientras falte el dato */
export function pending(value: string | number | undefined | null, placeholder = '[N]'): string {
	return value === undefined || value === null || value === '' ? placeholder : String(value);
}

/** "Colombia · Pacífico chocoano" */
export function destinationEyebrow(d: Destination['data'], lang: Locale): string {
	return [d.country[lang], d.region?.[lang]].filter(Boolean).join(' · ');
}

/**
 * Línea de datos de la tarjeta: "[N] días · vuelo desde Medellín · Darien Lodge".
 * Usa `highlights` si existen; si no, especie principal y temporada.
 */
export function destinationFacts(d: Destination['data'], lang: Locale, daysTemplate: string): string {
	const days = fill(daysTemplate, { n: pending(d.duration.days) });
	const rest = d.highlights.length
		? d.highlights.map((h) => h[lang])
		: [d.mainSpecies?.[lang], d.season?.[lang]].filter((v): v is string => Boolean(v));
	return [days, ...rest].join(' · ');
}

/** Reemplaza {clave} en un texto */
export function fill(template: string, vars: Record<string, string>): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}
