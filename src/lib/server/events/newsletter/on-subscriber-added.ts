import type { SubscriberAddedEvent } from '$lib/types/events';
import { getDb, getClient } from '$lib/server/database/mongo';

export async function onSubscriberAdded(event: SubscriberAddedEvent): Promise<void> {
	const session = getClient().startSession();
	try {
		await session.withTransaction(async () => {
			const db = getDb();
			await db.collection('newsletter_subscribers').insertOne(
				{
					id: event.aggregateId,
					email: event.payload.email,
					subscribedAt: event.occurredAt
				},
				{ session }
			);
			await db.collection('events').insertOne({ ...event }, { session });
		});
	} finally {
		await session.endSession();
	}
}
