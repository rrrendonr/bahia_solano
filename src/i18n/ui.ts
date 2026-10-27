import { defaultLocale, type Locale } from './config';

/** Textos de interfaz compartidos (menú, botones, etiquetas). El contenido de cada página vive aparte. */
export const ui = {
	es: {
		'nav.label': 'Principal',
		'nav.home': 'Inicio',
		'nav.about': 'Sobre nosotros',
		'nav.tours': 'Tours',
		'nav.contact': 'Contacto',
		'header.openMenu': 'Abrir menú',
		'header.closeMenu': 'Cerrar menú',
		'lang.label': 'Idioma',
		'skip.link': 'Saltar al contenido',
		'cta.quote': 'Cotiza tu viaje',
		'cta.quoteShort': 'Cotizar',
		'cta.whatsapp': 'Escríbenos por WhatsApp',
		'cta.viewTour': 'Ver tour',
		'cta.quoteTour': 'Cotizar este tour',
		'cta.askWhatsapp': 'Preguntar por WhatsApp',
		'breadcrumb.label': 'Ruta de navegación',
		'gallery.show': 'Ver foto {n} de {total}',
		'gallery.enlarge': 'Ampliar foto: {caption}',
		'gallery.hint': 'Toca una foto para verla en grande.',
		'gallery.categories': 'Categorías de fotos',
		'lightbox.label': 'Foto ampliada',
		'lightbox.close': 'Cerrar',
		'lightbox.prev': 'Foto anterior',
		'lightbox.next': 'Foto siguiente',
		'tour.feet': 'pies',
		'tour.anglers': 'hasta {n} pescadores',
		'tour.crew': 'tripulación incluida',
		'footer.location': 'Bahía Solano, Chocó · Colombia',
		'footer.navLabel': 'Navegación del pie de página',
		'footer.social': 'Redes sociales',
		'footer.contact': 'Contacto',
		'footer.rights': 'Todos los derechos reservados.',
	},
	en: {
		'nav.label': 'Main',
		'nav.home': 'Home',
		'nav.about': 'About us',
		'nav.tours': 'Tours',
		'nav.contact': 'Contact',
		'header.openMenu': 'Open menu',
		'header.closeMenu': 'Close menu',
		'lang.label': 'Language',
		'skip.link': 'Skip to content',
		'cta.quote': 'Plan your trip',
		'cta.quoteShort': 'Get a quote',
		'cta.whatsapp': 'Message us on WhatsApp',
		'cta.viewTour': 'See tour',
		'cta.quoteTour': 'Quote this tour',
		'cta.askWhatsapp': 'Ask on WhatsApp',
		'breadcrumb.label': 'Breadcrumb',
		'gallery.show': 'Show photo {n} of {total}',
		'gallery.enlarge': 'Enlarge photo: {caption}',
		'gallery.hint': 'Tap a photo to see it larger.',
		'gallery.categories': 'Photo categories',
		'lightbox.label': 'Enlarged photo',
		'lightbox.close': 'Close',
		'lightbox.prev': 'Previous photo',
		'lightbox.next': 'Next photo',
		'tour.feet': 'ft',
		'tour.anglers': 'up to {n} anglers',
		'tour.crew': 'crew included',
		'footer.location': 'Bahía Solano, Chocó · Colombia',
		'footer.navLabel': 'Footer navigation',
		'footer.social': 'Social media',
		'footer.contact': 'Contact',
		'footer.rights': 'All rights reserved.',
	},
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLocale];

/** t('cta.quote') o t('tour.anglers', { n: 4 }) */
export function useTranslations(lang: Locale) {
	return function t(key: UiKey, vars?: Record<string, string | number>): string {
		let text: string = ui[lang][key] ?? ui[defaultLocale][key];
		if (vars) {
			for (const [name, value] of Object.entries(vars)) {
				text = text.replaceAll(`{${name}}`, String(value));
			}
		}
		return text;
	};
}
