import { initEventStore } from '$lib/server/database/event-store';
import { registerUserHandlers } from '$lib/server/events/identity/on-user-created';
import { registerWebSocketHandler } from '$lib/server/ws/on-domain-event';

initEventStore();
registerUserHandlers();
registerWebSocketHandler();
