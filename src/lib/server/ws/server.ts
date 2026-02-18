import nodeAdapter from 'crossws/adapters/node';
import type { Server } from 'node:http';
import { addConnection, removeConnection } from './connections';

export function createWebSocketHandler() {
	return nodeAdapter({
		hooks: {
			message(peer, message) {
				let msg: { type: string; token?: string };
				try {
					msg = message.json();
				} catch {
					return;
				}

				if (msg.type === 'auth' && typeof msg.token === 'string') {
					// For now, token is just the userId directly.
					// Will be replaced with real session validation later.
					peer.context.userId = msg.token;
					addConnection(msg.token, peer);
					peer.send(JSON.stringify({ type: 'authenticated' }));
				}
			},
			close(peer) {
				const userId = peer.context.userId as string | undefined;
				if (userId) {
					removeConnection(userId, peer);
				}
			}
		}
	});
}

export function attachWebSocketServer(httpServer: Server) {
	const ws = createWebSocketHandler();

	httpServer.on('upgrade', (req, socket, head) => {
		const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
		if (url.pathname !== '/ws') return;
		ws.handleUpgrade(req, socket, head);
	});

	return ws;
}
