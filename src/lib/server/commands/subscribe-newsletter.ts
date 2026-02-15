import { randomUUID } from 'node:crypto';
import type { EventMetadata, SubscriberAddedEvent } from '$lib/types/events';
import { eventBus } from '$lib/server/core/event-bus';
import { getDb } from '$lib/server/database/mongo';
import { registerCommand, type CommandResult } from './registry';

export async function subscribeNewsletter(
	payload: Record<string, unknown>,
	metadata: EventMetadata
): Promise<CommandResult> {
	const email = (payload.email as string)?.trim();

	if (!email) return { ok: false, error: 'Email is required' };
	if (await getDb().collection('newsletter_subscribers').findOne({ email }))
		return { ok: false, error: 'Email already subscribed' };

	const id = randomUUID();
	const now = new Date();

	const event: SubscriberAddedEvent = {
		eventId: randomUUID(),
		eventType: 'newsletter.subscriber_added',
		aggregateId: id,
		aggregateType: 'NewsletterSubscriber',
		occurredAt: now,
		payload: { email },
		metadata
	};

	await eventBus.publish(event);

	return { ok: true };
}

registerCommand('SUBSCRIBE_NEWSLETTER', subscribeNewsletter);
