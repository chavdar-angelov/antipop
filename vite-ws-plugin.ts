import type { Plugin } from 'vite';

export function webSocketPlugin(): Plugin {
	return {
		name: 'websocket',
		configureServer(server) {
			if (!server.httpServer) return;

			server.httpServer.on('listening', async () => {
				const { attachWebSocketServer } = await server.ssrLoadModule('src/lib/server/ws/server.ts');
				attachWebSocketServer(server.httpServer!);
			});
		}
	};
}
