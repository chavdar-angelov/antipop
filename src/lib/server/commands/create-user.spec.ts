import { describe, it, expect, beforeAll } from 'vitest';
import { initEventStore, clearStoredEvents } from '$lib/server/database/event-store';
import { clearUsers } from '$lib/server/database/user-store';
import { registerUserHandlers } from '$lib/server/events/identity/on-user-created';
import { createUser } from './create-user';

beforeAll(() => {
	clearStoredEvents();
	clearUsers();
	initEventStore();
	registerUserHandlers();
});

describe('CREATE_USER handler', () => {
	it('should accept a valid email and password', async () => {
		const result = await createUser(
			{ email: 'alice@example.com', password: 'securePassword123' },
			{}
		);
		expect(result).toEqual({ ok: true });
	});

	it('should reject duplicate email', async () => {
		const result = await createUser(
			{ email: 'alice@example.com', password: 'otherPass456' },
			{}
		);
		expect(result).toEqual({ ok: false, error: 'Email already registered' });
	});

	it('should reject missing email', async () => {
		const result = await createUser({ password: 'securePassword123' }, {});
		expect(result).toEqual({ ok: false, error: 'Email is required' });
	});

	it('should reject empty email', async () => {
		const result = await createUser({ email: '', password: 'securePassword123' }, {});
		expect(result).toEqual({ ok: false, error: 'Email is required' });
	});

	it('should reject missing password', async () => {
		const result = await createUser({ email: 'bob@example.com' }, {});
		expect(result).toEqual({ ok: false, error: 'Password is required' });
	});

	it('should reject empty password', async () => {
		const result = await createUser({ email: 'bob@example.com', password: '' }, {});
		expect(result).toEqual({ ok: false, error: 'Password is required' });
	});
});
