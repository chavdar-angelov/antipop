import { eventBus } from './event-bus';
import { onUserCreated } from '$lib/server/events/identity/on-user-created';

export function registerHandlers(): void {
	eventBus.on('identity.user_created', onUserCreated);
}
