import { WebSocketServer, type WebSocket } from 'ws';
import type { Server } from 'node:http';
import { addConnection, removeConnection } from './connections';

export function attachWebSocketServer(httpServer: Server): WebSocketServer {
	const wss = new WebSocketServer({ noServer: true });

	httpServer.on('upgrade', (request, socket, head) => {
		// Only handle /ws path
		const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
		if (url.pathname !== '/ws') {
			socket.destroy();
			return;
		}

		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit('connection', ws, request);
		});
	});

	wss.on('connection', (ws: WebSocket) => {
		let userId: string | null = null;

		ws.on('message', (raw) => {
			let msg: { type: string; token?: string };
			try {
				msg = JSON.parse(String(raw));
			} catch {
				return;
			}

			if (msg.type === 'auth' && typeof msg.token === 'string') {
				// For now, token is just the userId directly.
				// Will be replaced with real session validation later.
				userId = msg.token;
				addConnection(userId, ws);
				ws.send(JSON.stringify({ type: 'authenticated' }));
			}
		});

		ws.on('close', () => {
			if (userId) {
				removeConnection(userId, ws);
			}
		});
	});

	return wss;
}
