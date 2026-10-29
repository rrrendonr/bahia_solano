import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Texto en los dos idiomas del sitio */
const localized = z.object({ es: z.string(), en: z.string() });

/** Íconos disponibles para las listas de valores (ver components/ui/Icon.astro) */
const valueIcon = z.enum(['map-pin', 'shield', 'fish', 'check', 'sailboat', 'house', 'plane']);

/**
 * Equipo: un archivo JSON por persona en src/content/team/.
 * La foto es opcional; mientras no exista se muestra un placeholder.
 */
const team = defineCollection({
	loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			order: z.number().int(),
			role: localized,
			experience: localized.optional(),
			bio: localized,
			photo: image().optional(),
			photoAlt: localized.optional(),
		}),
});

/** Textos de la página Sobre nosotros: un archivo por idioma (es.json, en.json). */
const about = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/about' }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
		hero: z.object({
			eyebrow: z.string(),
			title: z.string(),
			titleAccent: z.string(),
			intro: z.string(),
			imageLabel: z.string(),
		}),
		story: z.object({
			eyebrow: z.string(),
			title: z.string(),
			paragraphs: z.array(z.string()).min(1),
			milestones: z.array(z.object({ year: z.string(), label: z.string() })),
		}),
		values: z.object({
			eyebrow: z.string(),
			title: z.string(),
			items: z.array(z.object({ icon: valueIcon, title: z.string(), text: z.string() })),
		}),
		team: z.object({
			eyebrow: z.string(),
			title: z.string(),
			intro: z.string(),
		}),
		destination: z.object({
			eyebrow: z.string(),
			title: z.string(),
			text: z.string(),
			imageLabel: z.string(),
			facts: z.array(z.object({ label: z.string(), value: z.string() })),
		}),
		cta: z.object({
			title: z.string(),
			titleAccent: z.string(),
			text: z.string(),
		}),
	}),
});

/**
 * Destinos: un archivo JSON por destino en src/content/destinations/.
 * El nombre del archivo es el slug de la URL (igual en ambos idiomas):
 * chile.json → /es/tours/chile/ y /en/tours/chile/.
 * Los datos numéricos son opcionales: mientras falten se muestran como [N].
 */
const destinations = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/destinations' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			order: z.number().int(),
			/** Destino destacado: tarjeta grande y primera en el listado */
			featured: z.boolean().default(false),
			country: localized,
			region: localized.optional(),
			/** Texto corto para la tarjeta del listado */
			summary: localized,
			headline: localized,
			paragraphs: z.array(localized).default([]),
			duration: z
				.object({
					days: z.number().int().positive().optional(),
					nights: z.number().int().nonnegative().optional(),
					fishingDays: z.number().int().positive().optional(),
				})
				.default({}),
			mainSpecies: localized.optional(),
			species: localized.optional(),
			fishingType: localized.optional(),
			season: localized.optional(),
			departure: localized.optional(),
			lodging: z.string().optional(),
			/** Datos extra para la tarjeta (p. ej. "vuelo desde Medellín") */
			highlights: z.array(localized).default([]),
			itinerary: z.array(z.object({ day: localized, title: localized, text: localized })).default([]),
			included: z.array(localized).default([]),
			excluded: z.array(localized).default([]),
			cover: image().optional(),
			coverAlt: localized.optional(),
			gallery: z.array(z.object({ src: image(), alt: localized })).default([]),
		}),
});

/** Textos del listado de Tours y de la plantilla de destino: un archivo por idioma. */
const toursPage = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/tours-page' }),
	schema: z.object({
		seo: z.object({ title: z.string(), description: z.string() }),
		hero: z.object({
			eyebrow: z.string(),
			title: z.string(),
			titleAccent: z.string(),
			intro: z.string(),
		}),
		featuredLabel: z.string(),
		viewDestination: z.string(),
		comparison: z.object({
			eyebrow: z.string(),
			title: z.string(),
			caption: z.string(),
			rows: z.object({
				country: z.string(),
				fishingType: z.string(),
				species: z.string(),
				duration: z.string(),
				season: z.string(),
				departure: z.string(),
			}),
		}),
		faq: z.object({
			eyebrow: z.string(),
			title: z.string(),
			intro: z.string(),
			items: z.array(z.object({ question: z.string(), answer: z.string() })),
		}),
		cta: z.object({ title: z.string(), titleAccent: z.string(), text: z.string() }),
		detail: z.object({
			summaryTitle: z.string(),
			summary: z.object({
				duration: z.string(),
				durationValue: z.string(),
				fishingDays: z.string(),
				species: z.string(),
				season: z.string(),
				departure: z.string(),
				lodging: z.string(),
			}),
			days: z.string(),
			aboutEyebrow: z.string(),
			itineraryEyebrow: z.string(),
			itineraryTitle: z.string(),
			includesTitle: z.string(),
			includedTitle: z.string(),
			excludedTitle: z.string(),
			otherTitle: z.string(),
			galleryLabel: z.string(),
			quote: z.string(),
			/** {name} se reemplaza por el nombre del destino */
			ctaTitle: z.string(),
			ctaTitleAccent: z.string(),
			ctaText: z.string(),
		}),
	}),
});

/** Textos de la página de Contacto: un archivo por idioma. */
const contactPage = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/contact-page' }),
	schema: z.object({
		seo: z.object({ title: z.string(), description: z.string() }),
		hero: z.object({
			eyebrow: z.string(),
			title: z.string(),
			titleAccent: z.string(),
			intro: z.string(),
		}),
		form: z.object({
			title: z.string(),
			requiredNote: z.string(),
			name: z.string(),
			email: z.string(),
			phone: z.string(),
			phonePlaceholder: z.string(),
			tour: z.string(),
			tourUndecided: z.string(),
			tourHint: z.string(),
			message: z.string(),
			optional: z.string(),
			messagePlaceholder: z.string(),
			submit: z.string(),
			whatsapp: z.string(),
			note: z.string(),
			/** Asunto del correo que llega por Formspree */
			emailSubject: z.string(),
			/** Mensaje de WhatsApp: {name} {email} {phone} {tour} {message} */
			whatsappTemplate: z.string(),
		}),
		channels: z.object({
			title: z.string(),
			whatsapp: z.string(),
			email: z.string(),
		}),
		faq: z.object({
			eyebrow: z.string(),
			title: z.string(),
			linkLabel: z.string(),
			/** Posiciones (desde 0) de las preguntas de Tours que se muestran aquí */
			fromTours: z.array(z.number().int().nonnegative()),
		}),
	}),
});

/**
 * Patrocinadores: un archivo JSON por patrocinador en src/content/sponsors/.
 * `logo` es una ruta relativa al JSON (p. ej. "../../assets/sponsors/marca.svg").
 * Sin logo se muestra el nombre como placeholder. `url` es opcional.
 */
const sponsors = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/sponsors' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			order: z.number().int(),
			logo: image().optional(),
			// Vacío ("") = el logo se muestra sin enlace
			url: z.union([z.url(), z.literal('')]).optional(),
		}),
});

export const collections = { team, about, destinations, toursPage, contactPage, sponsors };
