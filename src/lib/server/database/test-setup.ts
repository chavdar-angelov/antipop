import { beforeAll, afterAll } from 'vitest';
import { initDatabase, closeDatabase } from './mongo';

beforeAll(async () => {
	await initDatabase();
});

afterAll(async () => {
	await closeDatabase();
});
