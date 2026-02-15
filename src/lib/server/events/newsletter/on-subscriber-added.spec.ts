import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '$lib/server/database/mongo';
import type { SubscriberAddedEvent, SubscriberView } from '$lib/types/events';
import { onSubscriberAdded } from './on-subscriber-added';

beforeAll(async () => {
	const db = getDb();
	await db.collection('newsletter_subscribers').deleteMany({});
	await db.collection('events').deleteMany({});
});

describe('onSubscriberAdded', () => {
	it('should store subscriber and event in a transaction', async () => {
		const event: SubscriberAddedEvent = {
			eventId: 'evt-newsletter-1',
			eventType: 'newsletter.subscriber_added',
			aggregateId: 'sub-1',
			aggregateType: 'NewsletterSubscriber',
			occurredAt: new Date('2025-01-15T10:00:00Z'),
			payload: {
				email: 'newsletter-test@example.com'
			}
		};

		await onSubscriberAdded(event);

		const subscriber = await getDb()
			.collection<SubscriberView>('newsletter_subscribers')
			.findOne({ email: 'newsletter-test@example.com' }, { projection: { _id: 0 } });

		expect(subscriber).toEqual({
			id: 'sub-1',
			email: 'newsletter-test@example.com',
			subscribedAt: new Date('2025-01-15T10:00:00Z')
		});

		const storedEvent = await getDb()
			.collection('events')
			.findOne({ eventId: 'evt-newsletter-1' }, { projection: { _id: 0 } });

		expect(storedEvent).toEqual(event);
	});
});
