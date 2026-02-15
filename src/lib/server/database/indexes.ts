import { getDb } from './mongo';

export async function ensureIndexes(): Promise<void> {
	const db = getDb();

	await db.collection('users').createIndex({ email: 1 }, { unique: true });

	const events = db.collection('events');
	await events.createIndex({ eventType: 1 });
	await events.createIndex({ aggregateId: 1 });
	await events.createIndex({ occurredAt: 1 });
}
