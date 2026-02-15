import { describe, it, expect, beforeAll } from 'vitest';
import type { DomainEvent } from '$lib/types/events';
import { appendEvent, getStoredEvents, clearStoredEvents } from './event-store';

beforeAll(() => {
	clearStoredEvents();
});

describe('event-store', () => {
	it('should persist events', () => {
		const event: DomainEvent = {
			eventId: 'evt-store-1',
			eventType: 'identity.user_created',
			aggregateId: 'user-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01T00:00:00Z'),
			payload: { email: 'store-test@example.com' }
		};

		appendEvent(event);

		expect(getStoredEvents()).toContainEqual(event);
	});

	it('should serialize and deserialize dates correctly', () => {
		const event: DomainEvent = {
			eventId: 'evt-store-2',
			eventType: 'catalog.item_listed',
			aggregateId: 'item-1',
			aggregateType: 'Item',
			occurredAt: new Date('2025-06-01T12:30:00Z'),
			payload: { title: 'Vintage jacket' }
		};

		appendEvent(event);

		expect(getStoredEvents()).toContainEqual(event);
	});

	it('should clear all events', () => {
		clearStoredEvents();

		const stored = getStoredEvents();
		expect(stored).toEqual([]);
	});
});
