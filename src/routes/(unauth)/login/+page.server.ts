import { fail, type Actions, redirect } from '@sveltejs/kit';
import { FARM_API } from '$env/static/private';
import type { SignIn, User } from '$lib/index';

export const actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username) {
			return fail(400, { messageUsername: '*Requerido*' });
		}

		if (!password) {
			return fail(400, { messagePassword: '*Requerido*' });
		}

		const payload: SignIn = {
			username,
			password
		};

		const response = await fetch(`${FARM_API}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});

		const messagesError: { [key: number]: string } = {
			400: 'El servidor no pudo procesar la solicitud. Debido a que la sintaxis de la solicitud es incorrecta',
			401: 'Las credenciales proporcionadas son invalidas o el usuario no esta autorizado',
			404: 'El servidor no puede encontrar el recurso solicitado',
			500: 'Ocurrio un error en el servidor que impidió procesar la solicitud, intentarlo nuevamente, si el error persiste reportar con el Administrador'
		};

		if (response.status !== 200) {
			return fail(400, { messageValidation: messagesError[response.status] });
		}

		const user: User = (await response.json()) as User;

		const date = new Date();
		date.setTime(date.getTime() + (1*24*60*60*1000));
		console.log(`Expiration token - ${date}`);

		cookies.set('session', user.usuario, {
			path: '/',
			httpOnly: true,
			sameSite: "strict",
			expires: date
		});

		throw redirect(303, '/');
	},
	logout: async ({ locals }) => {
	
		if (!locals.session) return;
		locals.session = null;
	}
} satisfies Actions;
