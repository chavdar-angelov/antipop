import type { EventMetadata } from '$lib/types/events';

export type CommandResult<T = unknown> = { ok: true; data: T } | { ok: false; error: string };

export type CommandHandler = (
	payload: Record<string, unknown>,
	metadata: EventMetadata
) => Promise<CommandResult>;

const handlers = new Map<string, CommandHandler>();

export function registerCommand(command: string, handler: CommandHandler): void {
	handlers.set(command, handler);
}

export function getHandler(command: string): CommandHandler | undefined {
	return handlers.get(command);
}
