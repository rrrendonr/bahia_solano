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
 * Tours: un archivo JSON por bote en src/content/tours/. El nombre del archivo es el slug
 * de la URL (igual en ambos idiomas): bote-1.json → /es/tours/bote-1/ y /en/tours/bote-1/.
 * Los datos numéricos son opcionales: mientras falten se muestran como [N].
 */
const tours = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/tours' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			order: z.number().int(),
			featured: z.boolean().default(false),
			category: localized.optional(),
			summary: localized,
			headline: localized,
			description: localized,
			lengthFt: z.number().positive().optional(),
			maxAnglers: z.number().int().positive().optional(),
			duration: z
				.object({
					days: z.number().int().positive().optional(),
					nights: z.number().int().nonnegative().optional(),
					fishingDays: z.number().int().positive().optional(),
				})
				.default({}),
			specs: z.object({
				engine: z.string().optional(),
				crew: localized.optional(),
				fishingType: localized.optional(),
				range: localized.optional(),
				idealFor: localized.optional(),
				onboard: localized.optional(),
			}),
			itinerary: z.array(z.object({ day: localized, title: localized, text: localized })).default([]),
			cover: image().optional(),
			coverAlt: localized.optional(),
			gallery: z.array(z.object({ src: image(), alt: localized })).default([]),
		}),
});

/** Textos de la página de Tours y de las páginas de detalle: un archivo por idioma. */
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
		comparison: z.object({
			eyebrow: z.string(),
			title: z.string(),
			caption: z.string(),
			rows: z.object({
				length: z.string(),
				anglers: z.string(),
				engine: z.string(),
				fishingType: z.string(),
				range: z.string(),
				idealFor: z.string(),
			}),
		}),
		includes: z.object({
			eyebrow: z.string(),
			title: z.string(),
			includedTitle: z.string(),
			included: z.array(z.string()),
			excludedTitle: z.string(),
			excluded: z.array(z.string()),
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
				anglers: z.string(),
				anglersValue: z.string(),
				departure: z.string(),
				departureValue: z.string(),
				lodging: z.string(),
			}),
			boatEyebrow: z.string(),
			specs: z.object({
				length: z.string(),
				engine: z.string(),
				capacity: z.string(),
				crew: z.string(),
				fishingType: z.string(),
				onboard: z.string(),
			}),
			itineraryEyebrow: z.string(),
			itineraryTitle: z.string(),
			includedNote: z.string(),
			includedLink: z.string(),
			otherToursTitle: z.string(),
			galleryLabel: z.string(),
			cta: z.object({ title: z.string(), titleAccent: z.string(), text: z.string() }),
		}),
	}),
});

/**
 * Hotel (Darien Lodge): src/content/lodge/darien-lodge.json.
 * Cada foto pertenece a una categoría (pestaña de la galería). `src` es opcional:
 * mientras no haya foto se muestra un placeholder con el pie de foto.
 */
const lodge = defineCollection({
	loader: glob({ pattern: '*.json', base: './src/content/lodge' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			eyebrow: localized,
			description: localized,
			facts: z.array(z.object({ label: localized, value: localized })).default([]),
			categories: z.array(z.object({ id: z.string(), label: localized })).min(1),
			photos: z
				.array(
					z.object({
						category: z.string(),
						caption: localized,
						src: image().optional(),
					}),
				)
				.default([]),
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

export const collections = { team, about, tours, toursPage, lodge, contactPage };
