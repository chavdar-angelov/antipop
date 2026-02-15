import type { UserCreatedEvent } from '$lib/types/events';
import { getDb, getClient } from '$lib/server/database/mongo';

export async function onUserCreated(event: UserCreatedEvent): Promise<void> {
	const session = getClient().startSession();
	try {
		await session.withTransaction(async () => {
			const db = getDb();
			await db.collection('users').insertOne(
				{
					id: event.aggregateId,
					email: event.payload.email,
					passwordHash: event.payload.passwordHash,
					roles: event.payload.roles,
					createdAt: event.occurredAt
				},
				{ session }
			);
			await db.collection('events').insertOne({ ...event }, { session });
		});
	} finally {
		await session.endSession();
	}
}
