import type { DomainEvent } from '$lib/types/events';

type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => Promise<void> | void;

export class EventBus {
	private handlers = new Map<string, EventHandler[]>();
	private globalHandlers: EventHandler[] = [];

	on<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
		const existing = this.handlers.get(eventType) ?? [];
		existing.push(handler as EventHandler);
		this.handlers.set(eventType, existing);
	}

	onAll(handler: EventHandler): void {
		this.globalHandlers.push(handler);
	}

	async publish(event: DomainEvent): Promise<void> {
		const specific = this.handlers.get(event.eventType) ?? [];
		for (const handler of [...specific, ...this.globalHandlers]) {
			await handler(event);
		}
	}

	clear(): void {
		this.handlers.clear();
		this.globalHandlers = [];
	}
}

export const eventBus = new EventBus();
