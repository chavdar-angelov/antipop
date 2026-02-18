import { createServer, type Server } from 'node:http';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { attachWebSocketServer } from './server';
import { getConnections, clearConnections } from './connections';

let server: Server;
let port: number;

function connectWs(path = '/ws'): WebSocket {
	return new WebSocket(`ws://localhost:${port}${path}`);
}

function waitFor(ws: WebSocket, event: string): Promise<MessageEvent | Event> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(new Error(`timeout waiting for ${event}`)), 2000);
		ws.addEventListener(
			event,
			(e) => {
				clearTimeout(timer);
				resolve(e);
			},
			{ once: true }
		);
	});
}

beforeAll(async () => {
	server = createServer();
	attachWebSocketServer(server);
	await new Promise<void>((resolve) => {
		server.listen(0, () => {
			const addr = server.address();
			port = typeof addr === 'object' && addr ? addr.port : 0;
			resolve();
		});
	});
});

afterEach(() => {
	clearConnections();
});

afterAll(async () => {
	await new Promise<void>((resolve) => server.close(() => resolve()));
});

describe('websocket server', () => {
	it('should accept a connection on /ws', async () => {
		expect.assertions(1);
		const ws = connectWs();
		await waitFor(ws, 'open');
		expect(ws.readyState).toBe(WebSocket.OPEN);
		ws.close();
	});

	it('should authenticate and respond', async () => {
		expect.assertions(2);
		const ws = connectWs();
		await waitFor(ws, 'open');

		ws.send(JSON.stringify({ type: 'auth', token: 'user-42' }));
		const event = (await waitFor(ws, 'message')) as MessageEvent;
		const data = JSON.parse(event.data);

		expect(data).toEqual({ type: 'authenticated' });
		expect(getConnections('user-42')?.size).toBe(1);
		ws.close();
	});

	it('should remove connection on close', async () => {
		expect.assertions(2);
		const ws = connectWs();
		await waitFor(ws, 'open');

		ws.send(JSON.stringify({ type: 'auth', token: 'user-99' }));
		await waitFor(ws, 'message');
		expect(getConnections('user-99')?.size).toBe(1);

		ws.close();
		// Wait for the close event to propagate to the server
		await new Promise((r) => setTimeout(r, 100));
		expect(getConnections('user-99')).toBeUndefined();
	});

	it('should ignore invalid JSON messages', async () => {
		expect.assertions(1);
		const ws = connectWs();
		await waitFor(ws, 'open');

		ws.send('not json');
		// Give the server time to process (and not crash)
		await new Promise((r) => setTimeout(r, 100));
		expect(ws.readyState).toBe(WebSocket.OPEN);
		ws.close();
	});

	it('should support multiple connections per user', async () => {
		expect.assertions(1);
		const ws1 = connectWs();
		const ws2 = connectWs();
		await Promise.all([waitFor(ws1, 'open'), waitFor(ws2, 'open')]);

		ws1.send(JSON.stringify({ type: 'auth', token: 'user-multi' }));
		ws2.send(JSON.stringify({ type: 'auth', token: 'user-multi' }));
		await Promise.all([waitFor(ws1, 'message'), waitFor(ws2, 'message')]);

		expect(getConnections('user-multi')?.size).toBe(2);
		ws1.close();
		ws2.close();
	});
});
