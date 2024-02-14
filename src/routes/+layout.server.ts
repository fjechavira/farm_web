import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	
	if (!locals.session) {
		return {
			session: null
		};
	}	

	return {
		session: locals.session
	};
}) satisfies LayoutServerLoad;
