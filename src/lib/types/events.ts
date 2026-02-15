export interface EventMetadata {
	readonly userId?: string;
	readonly correlationId?: string;
}

export interface DomainEvent {
	readonly eventId: string;
	readonly eventType: string;
	readonly aggregateId: string;
	readonly aggregateType: string;
	readonly occurredAt: Date;
	readonly payload: Record<string, unknown>;
	readonly metadata?: EventMetadata;
}

export interface UserView {
	id: string;
	email: string;
	passwordHash: string;
	roles: string[];
	createdAt: Date;
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

export interface SubscriberView {
	id: string;
	email: string;
	subscribedAt: Date;
}

export interface SubscriberAddedEvent extends DomainEvent {
	eventType: 'newsletter.subscriber_added';
	aggregateType: 'NewsletterSubscriber';
	payload: {
		email: string;
	};
}
