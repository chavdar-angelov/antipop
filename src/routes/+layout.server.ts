import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const debug = env.DEBUG === 'true';
	const role = cookies.get('debug-role') ?? 'public';

	return { debug, role };
};
