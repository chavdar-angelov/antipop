export interface DomainEvent {
	readonly eventId: string;
	readonly eventType: string;
	readonly aggregateId: string;
	readonly aggregateType: string;
	readonly occurredAt: Date;
	readonly payload: Record<string, unknown>;
}

export interface UserCreatedEvent extends DomainEvent {
	eventType: 'identity.user_created';
	aggregateType: 'User';
	payload: {
		email: string;
		passwordHash: string;
		roles: string[];
	};
}
