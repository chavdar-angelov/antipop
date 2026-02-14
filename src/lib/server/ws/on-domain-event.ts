import { eventBus } from '$lib/server/events/event-bus';
import { sendToUser } from './connections';

const SENSITIVE_KEYS = new Set(['passwordHash', 'password']);

function stripSensitive(payload: Record<string, unknown>): Record<string, unknown> {
	const clean: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(payload)) {
		if (!SENSITIVE_KEYS.has(key)) {
			clean[key] = value;
		}
	}
	return clean;
}

export function registerWebSocketHandler(): void {
	eventBus.onAll((event) => {
		const userId = event.metadata?.userId;
		if (!userId) return;

		const message = JSON.stringify({
			type: 'event',
			event: event.eventType,
			data: stripSensitive(event.payload),
			correlationId: event.metadata?.correlationId,
			aggregateId: event.aggregateId,
			occurredAt: event.occurredAt
		});

		sendToUser(userId, message);
	});
}
