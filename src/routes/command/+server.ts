import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getHandler } from '$lib/server/commands/registry';
import '$lib/server/commands/create-user';

export const POST: RequestHandler = async ({ request }) => {
	const { command, payload, correlationId } = await request.json();

	const handler = getHandler(command);
	if (!handler) {
		return json({ ok: false, error: `Unknown command: ${command}` }, { status: 400 });
	}

	const metadata = {
		correlationId: typeof correlationId === 'string' ? correlationId : undefined
	};

	handler(payload, metadata);

	return json({ ok: true }, { status: 200 });
};
