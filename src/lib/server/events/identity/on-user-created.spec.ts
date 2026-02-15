import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '$lib/server/database/mongo';
import type { UserCreatedEvent, UserView } from '$lib/types/events';
import { onUserCreated } from './on-user-created';

beforeAll(async () => {
	const db = getDb();
	await db.collection('users').deleteMany({});
	await db.collection('events').deleteMany({});
});

describe('onUserCreated', () => {
	it('should store user and event in a transaction', async () => {
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

		await onUserCreated(event);

		const user = await getDb()
			.collection<UserView>('users')
			.findOne({ email: 'handler-test@example.com' }, { projection: { _id: 0 } });

		expect(user).toEqual({
			id: 'user-1',
			email: 'handler-test@example.com',
			passwordHash: 'hashed_pw',
			roles: ['buyer'],
			createdAt: new Date('2025-01-15T10:00:00Z')
		});

		const storedEvent = await getDb()
			.collection('events')
			.findOne({ eventId: 'evt-1' }, { projection: { _id: 0 } });

		expect(storedEvent).toEqual(event);
	});
});
