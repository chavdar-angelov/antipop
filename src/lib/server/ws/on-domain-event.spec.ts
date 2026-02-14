import { describe, it, expect, beforeEach } from 'vitest';
import type { WebSocket } from 'ws';
import { eventBus } from '$lib/server/events/event-bus';
import { addConnection, clearConnections } from './connections';
import { registerWebSocketHandler } from './on-domain-event';

function mockWs(): WebSocket & { sent: string[] } {
	const sent: string[] = [];
	return {
		readyState: 1,
		OPEN: 1,
		send: (msg: string) => sent.push(msg),
		sent
	} as unknown as WebSocket & { sent: string[] };
}

beforeEach(() => {
	eventBus.clear();
	clearConnections();
	globalThis.__wsConnections = undefined;
	registerWebSocketHandler();
});

describe('event bus → WebSocket bridge', () => {
	it('should forward an event to the user who triggered it', async () => {
		const ws = mockWs();
		addConnection('user-1', ws);

		await eventBus.publish({
			eventId: 'evt-1',
			eventType: 'identity.user_created',
			aggregateId: 'agg-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01'),
			payload: { email: 'alice@example.com', roles: ['customer'] },
			metadata: { userId: 'user-1', correlationId: 'corr-1' }
		});

		expect(ws.sent).toHaveLength(1);
		const msg = JSON.parse(ws.sent[0]);
		expect(msg).toMatchObject({
			type: 'event',
			event: 'identity.user_created',
			data: { email: 'alice@example.com', roles: ['customer'] },
			correlationId: 'corr-1',
			aggregateId: 'agg-1'
		});
	});

	it('should strip sensitive fields from the payload', async () => {
		const ws = mockWs();
		addConnection('user-1', ws);

		await eventBus.publish({
			eventId: 'evt-1',
			eventType: 'identity.user_created',
			aggregateId: 'agg-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01'),
			payload: { email: 'alice@example.com', passwordHash: 'secret', password: 'raw' },
			metadata: { userId: 'user-1' }
		});

		expect(ws.sent).toHaveLength(1);
		const msg = JSON.parse(ws.sent[0]);
		expect(msg.data).toEqual({ email: 'alice@example.com' });
		expect(msg.data).not.toHaveProperty('passwordHash');
		expect(msg.data).not.toHaveProperty('password');
	});

	it('should not send anything when event has no userId in metadata', async () => {
		const ws = mockWs();
		addConnection('user-1', ws);

		await eventBus.publish({
			eventId: 'evt-1',
			eventType: 'identity.user_created',
			aggregateId: 'agg-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01'),
			payload: { email: 'alice@example.com' },
			metadata: {}
		});

		expect(ws.sent).toHaveLength(0);
	});

	it('should not send anything when event has no metadata', async () => {
		const ws = mockWs();
		addConnection('user-1', ws);

		await eventBus.publish({
			eventId: 'evt-1',
			eventType: 'identity.user_created',
			aggregateId: 'agg-1',
			aggregateType: 'User',
			occurredAt: new Date('2025-01-01'),
			payload: { email: 'alice@example.com' }
		});

		expect(ws.sent).toHaveLength(0);
	});
});
