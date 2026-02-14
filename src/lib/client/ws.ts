type EventListener = (data: {
	event: string;
	data: Record<string, unknown>;
	correlationId?: string;
	aggregateId: string;
	occurredAt: string;
}) => void;

let ws: WebSocket | null = null;
let token: string | null = null;
const listeners = new Set<EventListener>();
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

function getUrl(): string {
	const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
	return `${protocol}//${location.host}/ws`;
}

function scheduleReconnect(): void {
	if (reconnectTimer) return;
	reconnectTimer = setTimeout(() => {
		reconnectTimer = null;
		if (token) connect(token);
	}, 2000);
}

export function connect(authToken: string): void {
	token = authToken;
	if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
		return;
	}

	ws = new WebSocket(getUrl());

	ws.addEventListener('open', () => {
		ws!.send(JSON.stringify({ type: 'auth', token }));
	});

	ws.addEventListener('message', (e) => {
		let msg: Record<string, unknown>;
		try {
			msg = JSON.parse(String(e.data));
		} catch {
			return;
		}

		if (msg.type === 'event') {
			const payload = {
				event: msg.event as string,
				data: msg.data as Record<string, unknown>,
				correlationId: msg.correlationId as string | undefined,
				aggregateId: msg.aggregateId as string,
				occurredAt: msg.occurredAt as string
			};
			for (const listener of listeners) {
				listener(payload);
			}
		}
	});

	ws.addEventListener('close', () => {
		ws = null;
		scheduleReconnect();
	});

	ws.addEventListener('error', () => {
		ws?.close();
	});
}

export function onEvent(listener: EventListener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function disconnect(): void {
	token = null;
	if (reconnectTimer) {
		clearTimeout(reconnectTimer);
		reconnectTimer = null;
	}
	if (ws) {
		ws.close();
		ws = null;
	}
	listeners.clear();
}
