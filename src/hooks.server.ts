import { initEventStore } from '$lib/server/events/event-store';
import { registerUserHandlers } from '$lib/server/identity/on-user-created';
import { registerWebSocketHandler } from '$lib/server/ws/on-domain-event';

initEventStore();
registerUserHandlers();
registerWebSocketHandler();
