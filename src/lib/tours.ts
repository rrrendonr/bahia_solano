import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/config';
import { localizePath } from '../i18n/routes';

export type Tour = CollectionEntry<'tours'>;

/** Tours ordenados por el campo `order` */
export async function getTours(): Promise<Tour[]> {
	return (await getCollection('tours')).sort((a, b) => a.data.order - b.data.order);
}

/** /es/tours/bote-1/ */
export function tourPath(lang: Locale, id: string): string {
	return localizePath('tours', lang, id);
}

/** Contacto con el tour preseleccionado: /es/contacto/?tour=bote-1 */
export function tourQuotePath(lang: Locale, id: string): string {
	return `${localizePath('contact', lang)}?tour=${encodeURIComponent(id)}`;
}

/** Muestra el valor o un marcador visible mientras falte el dato */
export function pending(value: string | number | undefined | null, placeholder = '[N]'): string {
	return value === undefined || value === null || value === '' ? placeholder : String(value);
}

/** Reemplaza {clave} en un texto */
export function fill(template: string, vars: Record<string, string>): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}
