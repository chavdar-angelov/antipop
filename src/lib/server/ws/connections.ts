import type { WebSocket } from 'ws';

type ConnectionMap = Map<string, Set<WebSocket>>;

declare global {
	// eslint-disable-next-line no-var
	var __wsConnections: ConnectionMap | undefined;
}

function getMap(): ConnectionMap {
	if (!globalThis.__wsConnections) {
		globalThis.__wsConnections = new Map();
	}
	return globalThis.__wsConnections;
}

export function addConnection(userId: string, ws: WebSocket): void {
	const map = getMap();
	let userSet = map.get(userId);
	if (!userSet) {
		userSet = new Set();
		map.set(userId, userSet);
	}
	userSet.add(ws);
}

export function removeConnection(userId: string, ws: WebSocket): void {
	const map = getMap();
	const userSet = map.get(userId);
	if (!userSet) return;
	userSet.delete(ws);
	if (userSet.size === 0) {
		map.delete(userId);
	}
}

export function getConnections(userId: string): Set<WebSocket> | undefined {
	return getMap().get(userId);
}

export function sendToUser(userId: string, message: string): void {
	const userSet = getMap().get(userId);
	if (!userSet) return;
	for (const ws of userSet) {
		if (ws.readyState === ws.OPEN) {
			ws.send(message);
		}
	}
}

export function clearConnections(): void {
	getMap().clear();
}
