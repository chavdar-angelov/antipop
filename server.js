import { createServer } from 'node:http';
import nodeAdapter from 'crossws/adapters/node';
import { handler } from './build/handler.js';

const server = createServer(handler);

// Ensure globalThis map exists before SvelteKit handler loads
if (!globalThis.__wsConnections) {
	globalThis.__wsConnections = new Map();
}

const ws = nodeAdapter({
	hooks: {
		message(peer, message) {
			let msg;
			try {
				msg = message.json();
			} catch {
				return;
			}

			if (msg.type === 'auth' && typeof msg.token === 'string') {
				peer.context.userId = msg.token;
				const map = globalThis.__wsConnections;
				if (!map.has(msg.token)) map.set(msg.token, new Set());
				map.get(msg.token).add(peer);
				peer.send(JSON.stringify({ type: 'authenticated' }));
			}
		},
		close(peer) {
			const userId = peer.context.userId;
			if (userId) {
				const map = globalThis.__wsConnections;
				const set = map.get(userId);
				if (set) {
					set.delete(peer);
					if (set.size === 0) map.delete(userId);
				}
			}
		}
	}
});

server.on('upgrade', (req, socket, head) => {
	const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
	if (url.pathname !== '/ws') return;
	ws.handleUpgrade(req, socket, head);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
