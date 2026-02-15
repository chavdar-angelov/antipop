import { MongoClient, type Db } from 'mongodb';
import { env } from '$env/dynamic/private';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function initDatabase(): Promise<void> {
	if (db) return;

	const uri = env.MONGODB_URI;
	if (!uri) throw new Error('MONGODB_URI environment variable is not set');

	const dbName = env.MONGODB_DATABASE ?? 'antipop';

	client = new MongoClient(uri);
	await client.connect();
	db = client.db(dbName);
}

export function getDb(): Db {
	if (!db) throw new Error('Database not initialized — call initDatabase() first');
	return db;
}

export function getClient(): MongoClient {
	if (!client) throw new Error('Database not initialized — call initDatabase() first');
	return client;
}

export async function closeDatabase(): Promise<void> {
	if (client) {
		await client.close();
		client = null;
		db = null;
	}
}
