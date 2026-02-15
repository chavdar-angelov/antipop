import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DomainEvent } from '$lib/types/events';

interface EventRow {
	eventId: string;
	eventType: string;
	aggregateId: string;
	aggregateType: string;
	occurredAt: string;
	payload: Record<string, unknown>;
	metadata?: { userId?: string; correlationId?: string };
}

const DATA_DIR = resolve('data');
const FILE_PATH = resolve(DATA_DIR, 'event_log.json');

function ensureDir(): void {
	if (!existsSync(DATA_DIR)) {
		mkdirSync(DATA_DIR, { recursive: true });
	}
}

function readAll(): DomainEvent[] {
	if (!existsSync(FILE_PATH)) return [];
	const raw = readFileSync(FILE_PATH, 'utf-8');
	const rows: EventRow[] = JSON.parse(raw);
	return rows.map((r) => ({ ...r, occurredAt: new Date(r.occurredAt) }));
}

function writeAll(events: DomainEvent[]): void {
	ensureDir();
	const rows: EventRow[] = events.map((e) => ({
		...e,
		occurredAt: e.occurredAt.toISOString()
	}));
	writeFileSync(FILE_PATH, JSON.stringify(rows, null, '\t') + '\n');
}

export function appendEvent(event: DomainEvent): void {
	const events = readAll();
	events.push(event);
	writeAll(events);
}

export function getStoredEvents(): DomainEvent[] {
	return readAll();
}

export function clearStoredEvents(): void {
	writeAll([]);
}
