import { describe, it, expect, beforeAll } from 'vitest';
import { clearUsers, getUserByEmail } from '$lib/server/database/user-store';
import type { UserCreatedEvent } from '$lib/types/events';
import { onUserCreated } from './on-user-created';

beforeAll(() => {
	clearUsers();
});

describe('onUserCreated', () => {
	it('should store user with all fields', () => {
		const event: UserCreatedEvent = {
			eventId: 'evt-1',
			eventType: 'identity.user_created',
			aggregateId: 'user-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-15T10:00:00Z'),
			payload: {
				email: 'handler-test@example.com',
				passwordHash: 'hashed_pw',
				roles: ['buyer']
			}
		};

		onUserCreated(event);

		expect(getUserByEmail('handler-test@example.com')).toEqual({
			id: 'user-1',
			email: 'handler-test@example.com',
			passwordHash: 'hashed_pw',
			roles: ['buyer'],
			createdAt: new Date('2025-01-15T10:00:00Z')
		});
	});
});
