export type CommandResult<T = unknown> =
	| { ok: true; data: T }
	| { ok: false; error: string };

export type CommandHandler = (payload: Record<string, unknown>) => Promise<CommandResult>;

const handlers = new Map<string, CommandHandler>();

export function registerCommand(command: string, handler: CommandHandler): void {
	handlers.set(command, handler);
}

export function getHandler(command: string): CommandHandler | undefined {
	return handlers.get(command);
}
