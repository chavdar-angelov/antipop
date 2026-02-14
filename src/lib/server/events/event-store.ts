import type { DomainEvent } from '$lib/types/events';
import { eventBus } from './event-bus';

let events: DomainEvent[] = [];

export function initEventStore(): void {
	eventBus.onAll((event) => {
		events.push(event);
	});
}

export function getStoredEvents(): DomainEvent[] {
	return [...events];
}

export function clearStoredEvents(): void {
	events = [];
}
