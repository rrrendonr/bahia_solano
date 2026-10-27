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

	// TODO: URLs reales de redes sociales (las vacías no se muestran)
	social: {
		instagram: '',
		facebook: '',
		youtube: '',
	},
} as const;

export type SocialNetwork = keyof typeof site.social;
