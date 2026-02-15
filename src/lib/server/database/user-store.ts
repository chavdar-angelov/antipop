import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface UserView {
	id: string;
	email: string;
	passwordHash: string;
	roles: string[];
	createdAt: Date;
}

interface UserRow {
	id: string;
	email: string;
	passwordHash: string;
	roles: string[];
	createdAt: string;
}

const DATA_DIR = resolve('data');
const FILE_PATH = resolve(DATA_DIR, 'users.json');

function ensureDir(): void {
	if (!existsSync(DATA_DIR)) {
		mkdirSync(DATA_DIR, { recursive: true });
	}
}

function readAll(): UserView[] {
	if (!existsSync(FILE_PATH)) return [];
	const raw = readFileSync(FILE_PATH, 'utf-8');
	const rows: UserRow[] = JSON.parse(raw);
	return rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt) }));
}

function writeAll(users: UserView[]): void {
	ensureDir();
	const rows: UserRow[] = users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }));
	writeFileSync(FILE_PATH, JSON.stringify(rows, null, '\t') + '\n');
}

export function getUser(id: string): UserView | undefined {
	return readAll().find((u) => u.id === id);
}

export function getUserByEmail(email: string): UserView | undefined {
	return readAll().find((u) => u.email === email);
}

export function storeUser(user: UserView): void {
	const users = readAll();
	users.push(user);
	writeAll(users);
}

export function clearUsers(): void {
	writeAll([]);
}
