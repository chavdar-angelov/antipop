import { describe, it, expect, beforeAll } from 'vitest';
import { eventBus } from '$lib/server/core/event-bus';
import { clearStoredEvents } from '$lib/server/database/event-store';
import { getDb } from '$lib/server/database/mongo';
import { registerHandlers } from '$lib/server/core/register-handlers';
import { subscribeNewsletter } from './subscribe-newsletter';

beforeAll(async () => {
	eventBus.clear();
	await clearStoredEvents();
	await getDb().collection('newsletter_subscribers').deleteMany({});
	registerHandlers();
});

describe('SUBSCRIBE_NEWSLETTER handler', () => {
	it('should accept a valid email', async () => {
		const result = await subscribeNewsletter({ email: 'subscriber@example.com' }, {});
		expect(result).toEqual({ ok: true });
	});

	it('should reject duplicate email', async () => {
		const result = await subscribeNewsletter({ email: 'subscriber@example.com' }, {});
		expect(result).toEqual({ ok: false, error: 'Email already subscribed' });
	});

	it('should reject missing email', async () => {
		const result = await subscribeNewsletter({}, {});
		expect(result).toEqual({ ok: false, error: 'Email is required' });
	});

	it('should reject empty email', async () => {
		const result = await subscribeNewsletter({ email: '' }, {});
		expect(result).toEqual({ ok: false, error: 'Email is required' });
	});
});
