import { describe, it, expect, beforeAll } from 'vitest';
import type { DomainEvent } from '$lib/types/events';
import { appendEvent, getStoredEvents, clearStoredEvents } from './event-store';

beforeAll(async () => {
	await clearStoredEvents();
});

describe('event-store', () => {
	it('should persist events', async () => {
		const event: DomainEvent = {
			eventId: 'evt-store-1',
			eventType: 'identity.user_created',
			aggregateId: 'user-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01T00:00:00Z'),
			payload: { email: 'store-test@example.com' }
		};

		await appendEvent(event);

		expect(await getStoredEvents()).toContainEqual(event);
	});

	it('should serialize and deserialize dates correctly', async () => {
		const event: DomainEvent = {
			eventId: 'evt-store-2',
			eventType: 'catalog.item_listed',
			aggregateId: 'item-1',
			aggregateType: 'Item',
			occurredAt: new Date('2025-06-01T12:30:00Z'),
			payload: { title: 'Vintage jacket' }
		};

		await appendEvent(event);

		expect(await getStoredEvents()).toContainEqual(event);
	});

	it('should clear all events', async () => {
		await clearStoredEvents();

		const stored = await getStoredEvents();
		expect(stored).toEqual([]);
	});
});
