import { redirect, type Handle } from '@sveltejs/kit';


export const handle = (async ({ event, resolve }) => {

	const session = event.cookies.get("session");

	if (session) {
		event.locals.session = {
			id: 100,
			name: 'emanuel',
			username: 'echavira',
			status: 1
		}
	}

	const protectedRoutes: string[] = ['/user', '/medications', '/'];

	const logOutRoutes: string[] = ['/logout'];

	if (protectedRoutes.includes(event.url.pathname) && !session) {
		console.log(`Hooks, En Path protegido y No existe una session activa`);
		throw redirect(303, '/login');
	}

	if (logOutRoutes.includes(event.url.pathname)) {
		console.log(`Hooks, Eliminando la cookie token, Logout...`);
		await event.cookies.delete('session', {
			path: '/'
		});
		event.locals.session === null;
		throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
