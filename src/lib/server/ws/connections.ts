import type { Peer } from 'crossws';

type ConnectionMap = Map<string, Set<Peer>>;

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

export function addConnection(userId: string, peer: Peer): void {
	const map = getMap();
	let userSet = map.get(userId);
	if (!userSet) {
		userSet = new Set();
		map.set(userId, userSet);
	}
	userSet.add(peer);
}

export function removeConnection(userId: string, peer: Peer): void {
	const map = getMap();
	const userSet = map.get(userId);
	if (!userSet) return;
	userSet.delete(peer);
	if (userSet.size === 0) {
		map.delete(userId);
	}
}

export function getConnections(userId: string): Set<Peer> | undefined {
	return getMap().get(userId);
}

export function sendToUser(userId: string, message: string): void {
	const userSet = getMap().get(userId);
	if (!userSet) return;
	for (const peer of userSet) {
		try {
			peer.send(message);
		} catch {
			// peer may be closing
		}
	}
}

export function clearConnections(): void {
	getMap().clear();
}
