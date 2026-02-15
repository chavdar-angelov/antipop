import { eventBus } from './event-bus';
import { appendEvent } from '$lib/server/database/event-store';
import { onUserCreated } from '$lib/server/events/identity/on-user-created';

export function registerHandlers(): void {
	eventBus.on('identity.user_created', onUserCreated);
	eventBus.onAll(appendEvent);
}
