import type { DomainEvent } from '$lib/types/events';
import { getDb } from './mongo';

function events() {
	return getDb().collection<DomainEvent>('events');
}

export async function appendEvent(event: DomainEvent): Promise<void> {
	await events().insertOne({ ...event });
}

export async function getStoredEvents(): Promise<DomainEvent[]> {
	const docs = await events()
		.find({}, { projection: { _id: 0 }, sort: { occurredAt: 1 } })
		.toArray();
	return docs as DomainEvent[];
}

export async function clearStoredEvents(): Promise<void> {
	await events().deleteMany({});
}
