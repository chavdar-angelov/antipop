import { describe, it, expect, beforeEach } from 'vitest';
import type { WebSocket } from 'ws';
import {
	addConnection,
	removeConnection,
	getConnections,
	sendToUser,
	clearConnections
} from './connections';

function mockWs(open = true): WebSocket & { sent: string[] } {
	const sent: string[] = [];
	return {
		readyState: open ? 1 : 3,
		OPEN: 1,
		send: (msg: string) => sent.push(msg),
		sent
	} as unknown as WebSocket & { sent: string[] };
}

beforeEach(() => {
	clearConnections();
	globalThis.__wsConnections = undefined;
});

describe('connection manager', () => {
	it('should add and retrieve a connection', () => {
		const ws = mockWs();
		addConnection('user-1', ws);

		const conns = getConnections('user-1');
		expect(conns).toBeDefined();
		expect(conns!.size).toBe(1);
		expect(conns!.has(ws)).toBe(true);
	});

	it('should support multiple connections per user', () => {
		const ws1 = mockWs();
		const ws2 = mockWs();
		addConnection('user-1', ws1);
		addConnection('user-1', ws2);

		const conns = getConnections('user-1');
		expect(conns!.size).toBe(2);
	});

	it('should remove a connection', () => {
		const ws = mockWs();
		addConnection('user-1', ws);
		removeConnection('user-1', ws);

		expect(getConnections('user-1')).toBeUndefined();
	});

	it('should keep other connections when removing one', () => {
		const ws1 = mockWs();
		const ws2 = mockWs();
		addConnection('user-1', ws1);
		addConnection('user-1', ws2);
		removeConnection('user-1', ws1);

		const conns = getConnections('user-1');
		expect(conns!.size).toBe(1);
		expect(conns!.has(ws2)).toBe(true);
	});

	it('should send message to all open connections for a user', () => {
		const ws1 = mockWs(true);
		const ws2 = mockWs(true);
		addConnection('user-1', ws1);
		addConnection('user-1', ws2);

		sendToUser('user-1', '{"test":true}');

		expect(ws1.sent).toEqual(['{"test":true}']);
		expect(ws2.sent).toEqual(['{"test":true}']);
	});

	it('should skip closed connections when sending', () => {
		const wsOpen = mockWs(true);
		const wsClosed = mockWs(false);
		addConnection('user-1', wsOpen);
		addConnection('user-1', wsClosed);

		sendToUser('user-1', '{"test":true}');

		expect(wsOpen.sent).toEqual(['{"test":true}']);
		expect(wsClosed.sent).toEqual([]);
	});

	it('should do nothing when sending to unknown user', () => {
		expect(() => sendToUser('unknown', 'msg')).not.toThrow();
	});

	it('should do nothing when removing unknown user connection', () => {
		const ws = mockWs();
		expect(() => removeConnection('unknown', ws)).not.toThrow();
	});
});
