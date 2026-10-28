/**
 * Datos globales del negocio. Los campos vacíos se ocultan en la interfaz
 * hasta que se completen.
 */
export const site = {
	name: 'Bahía Solano Pesca',
	locality: 'Bahía Solano',
	region: 'Chocó',
	country: 'CO',

	contact: {
		// TODO: número en formato internacional sin "+" ni espacios, p. ej. 573001234567
		whatsapp: '',
		// TODO: correo de reservas
		email: '',
	},

	forms: {
		// TODO: ID del formulario de Formspree (p. ej. 'xpznqkdl'). Vacío = el botón "Enviar solicitud" no se muestra.
		formspreeId: '',
	},

	// Redes sociales (las vacías no se muestran)
	social: {
		facebook: 'https://web.facebook.com/FishingByColombia',
		instagram: 'https://www.instagram.com/bahiasolanopesca/',
		tiktok: 'https://www.tiktok.com/@bahiasolanopesca',
		youtube: '',
	},
} as const;

export type SocialNetwork = keyof typeof site.social;
