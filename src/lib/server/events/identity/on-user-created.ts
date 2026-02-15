import type { UserCreatedEvent } from '$lib/types/events';
import { storeUser } from '$lib/server/database/user-store';

export function onUserCreated(event: UserCreatedEvent): void {
	storeUser({
		id: event.aggregateId,
		email: event.payload.email,
		passwordHash: event.payload.passwordHash,
		roles: event.payload.roles,
		createdAt: event.occurredAt
	});
}
