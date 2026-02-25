import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	const role = cookies.get('debug-role') ?? 'public';

	if (role === 'brand') {
		redirect(307, '/dashboard/brand-profile');
	}

	redirect(307, '/dashboard/purchases');
};
