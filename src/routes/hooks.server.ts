import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const protectedRoutes: string[] = ['/user', '/medications', '/'];

	const logOutRoutes: string[] = ['/logout'];

	if (protectedRoutes.includes(event.url.pathname) && !localStorage.getItem('username')) {
		console.log(`Hooks, En Path protegido y No existe una session activa`);
		throw redirect(303, '/login');
	}

	if (logOutRoutes.includes(event.url.pathname)) {
		console.log(`Hooks, Eliminando la cookie token, Logout...`);
		await event.cookies.delete('token', {
			path: '/'
		});
		event.locals.user === null;
		throw redirect(303, '/login');
	}

	const response = await resolve(event);

	return response;
}) satisfies Handle;
