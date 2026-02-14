import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { handler } from './build/handler.js';

const server = createServer(handler);

const wss = new WebSocketServer({ noServer: true });

// Ensure globalThis map exists before SvelteKit handler loads
if (!globalThis.__wsConnections) {
	globalThis.__wsConnections = new Map();
}

server.on('upgrade', (request, socket, head) => {
	const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
	if (url.pathname !== '/ws') {
		socket.destroy();
		return;
	}
	wss.handleUpgrade(request, socket, head, (ws) => {
		wss.emit('connection', ws);
	});
});

wss.on('connection', (ws) => {
	let userId = null;

	ws.on('message', (raw) => {
		let msg;
		try {
			msg = JSON.parse(String(raw));
		} catch {
			return;
		}

		if (msg.type === 'auth' && typeof msg.token === 'string') {
			userId = msg.token;
			const map = globalThis.__wsConnections;
			if (!map.has(userId)) map.set(userId, new Set());
			map.get(userId).add(ws);
			ws.send(JSON.stringify({ type: 'authenticated' }));
		}
	});

	ws.on('close', () => {
		if (userId) {
			const map = globalThis.__wsConnections;
			const set = map.get(userId);
			if (set) {
				set.delete(ws);
				if (set.size === 0) map.delete(userId);
			}
		}
	});
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
