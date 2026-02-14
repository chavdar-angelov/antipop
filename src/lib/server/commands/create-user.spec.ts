import { describe, it, expect, beforeEach } from 'vitest';
import { eventBus } from '$lib/server/events/event-bus';
import { initEventStore, getStoredEvents, clearStoredEvents } from '$lib/server/events/event-store';
import { registerUserHandlers } from '$lib/server/identity/on-user-created';
import { getUser, getUserByEmail, clearUsers } from '$lib/server/identity/user-store';
import { createUser } from './create-user';

beforeEach(() => {
	eventBus.clear();
	clearStoredEvents();
	clearUsers();
	initEventStore();
	registerUserHandlers();
});

describe('CREATE_USER handler', () => {
	it('should return the user without password data', async () => {
		const result = await createUser({
			email: 'alice@example.com',
			password: 'securePassword123'
		});

		expect(result).toMatchObject({
			ok: true,
			data: {
				id: expect.any(String),
				email: 'alice@example.com',
				roles: ['customer'],
				createdAt: expect.any(Date)
			}
		});
		expect(result.ok && result.data).not.toHaveProperty('passwordHash');
		expect(result.ok && result.data).not.toHaveProperty('password');
	});

	it('should publish a UserCreated event to the event store', async () => {
		const result = await createUser({
			email: 'alice@example.com',
			password: 'securePassword123'
		});

		const events = getStoredEvents();
		expect(events).toHaveLength(1);
		expect(events[0]).toMatchObject({
			eventType: 'identity.user_created',
			aggregateType: 'User',
			payload: {
				email: 'alice@example.com',
				passwordHash: expect.any(String),
				roles: ['customer']
			}
		});
		expect(result.ok && events[0].aggregateId).toBe(result.ok && result.data.id);
	});

	it('should persist the user in the view model', async () => {
		const result = await createUser({
			email: 'alice@example.com',
			password: 'securePassword123'
		});
		if (!result.ok) throw new Error('Expected ok');

		const user = getUser(result.data.id);
		expect(user).toMatchObject({
			id: result.data.id,
			email: 'alice@example.com',
			passwordHash: expect.any(String),
			roles: ['customer']
		});
	});

	it('should be findable by email in the view model', async () => {
		await createUser({
			email: 'alice@example.com',
			password: 'securePassword123'
		});

		const user = getUserByEmail('alice@example.com');
		expect(user).toBeDefined();
		expect(user!.email).toBe('alice@example.com');
	});

	it('should reject missing email', async () => {
		const result = await createUser({ password: 'securePassword123' });
		expect(result).toMatchObject({ ok: false, error: 'Email is required' });
		expect(getStoredEvents()).toHaveLength(0);
	});

	it('should reject empty email', async () => {
		const result = await createUser({ email: '', password: 'securePassword123' });
		expect(result).toMatchObject({ ok: false, error: 'Email is required' });
		expect(getStoredEvents()).toHaveLength(0);
	});

	it('should reject missing password', async () => {
		const result = await createUser({ email: 'alice@example.com' });
		expect(result).toMatchObject({ ok: false, error: 'Password is required' });
		expect(getStoredEvents()).toHaveLength(0);
	});

	it('should reject empty password', async () => {
		const result = await createUser({ email: 'alice@example.com', password: '' });
		expect(result).toMatchObject({ ok: false, error: 'Password is required' });
		expect(getStoredEvents()).toHaveLength(0);
	});
});
