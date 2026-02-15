import type { UserCreatedEvent } from '$lib/types/events';
import { eventBus } from '$lib/server/core/event-bus';
import { storeUser } from '$lib/server/database/user-store';

export function registerUserHandlers(): void {
	eventBus.on<UserCreatedEvent>('identity.user_created', (event) => {
		storeUser({
			id: event.aggregateId,
			email: event.payload.email,
			passwordHash: event.payload.passwordHash,
			roles: event.payload.roles,
			createdAt: event.occurredAt
		});
	});
}
