import { describe, it, expect, beforeEach } from 'vitest';
import type { Peer } from 'crossws';
import {
	addConnection,
	removeConnection,
	getConnections,
	sendToUser,
	clearConnections
} from './connections';

function mockPeer(open = true): Peer & { sent: string[] } {
	const sent: string[] = [];
	return {
		send: (msg: string) => {
			if (!open) throw new Error('connection closed');
			sent.push(msg);
		},
		sent
	} as unknown as Peer & { sent: string[] };
}

beforeEach(() => {
	clearConnections();
	globalThis.__wsConnections = undefined;
});

describe('connection manager', () => {
	it('should add and retrieve a connection', () => {
		const peer = mockPeer();
		addConnection('user-1', peer);

		const conns = getConnections('user-1');
		expect(conns).toBeDefined();
		expect(conns!.size).toBe(1);
		expect(conns!.has(peer)).toBe(true);
	});

	it('should support multiple connections per user', () => {
		const peer1 = mockPeer();
		const peer2 = mockPeer();
		addConnection('user-1', peer1);
		addConnection('user-1', peer2);

		const conns = getConnections('user-1');
		expect(conns!.size).toBe(2);
	});

	it('should remove a connection', () => {
		const peer = mockPeer();
		addConnection('user-1', peer);
		removeConnection('user-1', peer);

		expect(getConnections('user-1')).toBeUndefined();
	});

	it('should keep other connections when removing one', () => {
		const peer1 = mockPeer();
		const peer2 = mockPeer();
		addConnection('user-1', peer1);
		addConnection('user-1', peer2);
		removeConnection('user-1', peer1);

		const conns = getConnections('user-1');
		expect(conns!.size).toBe(1);
		expect(conns!.has(peer2)).toBe(true);
	});

	it('should send message to all open connections for a user', () => {
		const peer1 = mockPeer(true);
		const peer2 = mockPeer(true);
		addConnection('user-1', peer1);
		addConnection('user-1', peer2);

		sendToUser('user-1', '{"test":true}');

		expect(peer1.sent).toEqual(['{"test":true}']);
		expect(peer2.sent).toEqual(['{"test":true}']);
	});

	it('should skip closed connections when sending', () => {
		const peerOpen = mockPeer(true);
		const peerClosed = mockPeer(false);
		addConnection('user-1', peerOpen);
		addConnection('user-1', peerClosed);

		sendToUser('user-1', '{"test":true}');

		expect(peerOpen.sent).toEqual(['{"test":true}']);
		expect(peerClosed.sent).toEqual([]);
	});

	it('should do nothing when sending to unknown user', () => {
		expect(() => sendToUser('unknown', 'msg')).not.toThrow();
	});

	it('should do nothing when removing unknown user connection', () => {
		const peer = mockPeer();
		expect(() => removeConnection('unknown', peer)).not.toThrow();
	});
});
