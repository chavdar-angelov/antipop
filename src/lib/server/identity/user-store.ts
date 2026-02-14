export interface UserView {
	id: string;
	email: string;
	passwordHash: string;
	roles: string[];
	createdAt: Date;
}

const users = new Map<string, UserView>();

export function getUser(id: string): UserView | undefined {
	return users.get(id);
}

export function getUserByEmail(email: string): UserView | undefined {
	for (const user of users.values()) {
		if (user.email === email) return user;
	}
	return undefined;
}

export function storeUser(user: UserView): void {
	users.set(user.id, user);
}

export function clearUsers(): void {
	users.clear();
}
