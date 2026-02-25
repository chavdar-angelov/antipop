import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, url }) => {
	const role = cookies.get('debug-role') ?? 'public';

	if (url.pathname === '/dashboard') {
		if (role === 'brand') {
			redirect(307, '/dashboard/overview');
		}

		if (role === 'influencer') {
			redirect(307, '/dashboard/my-affiliate');
		}

		redirect(307, '/dashboard/purchases');
	}
};
