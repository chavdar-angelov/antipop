import { randomUUID } from 'node:crypto';
import { hash } from '@node-rs/argon2';
import type { EventMetadata, UserCreatedEvent } from '$lib/types/events';
import { eventBus } from '$lib/server/events/event-bus';
import { registerCommand, type CommandResult } from './registry';

export async function createUser(
	payload: Record<string, unknown>,
	metadata: EventMetadata
): Promise<CommandResult> {
	const email = (payload.email as string)?.trim();
	const password = payload.password as string;

	if (!email) return { ok: false, error: 'Email is required' };
	if (!password) return { ok: false, error: 'Password is required' };

	const passwordHash = await hash(password);
	const id = randomUUID();
	const now = new Date();
	const roles = ['customer'];

	const event: UserCreatedEvent = {
		eventId: randomUUID(),
		eventType: 'identity.user_created',
		aggregateId: id,
		aggregateType: 'User',
		occurredAt: now,
		payload: { email, passwordHash, roles },
		metadata
	};

	await eventBus.publish(event);

	return {
		ok: true,
		data: { id, email, roles, createdAt: now }
	};
}

registerCommand('CREATE_USER', createUser);
