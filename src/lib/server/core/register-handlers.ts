import { eventBus } from './event-bus';
import { onUserCreated } from '$lib/server/events/identity/on-user-created';
import { onSubscriberAdded } from '$lib/server/events/newsletter/on-subscriber-added';

export function registerHandlers(): void {
	eventBus.on('identity.user_created', onUserCreated);
	eventBus.on('newsletter.subscriber_added', onSubscriberAdded);
}
