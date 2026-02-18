export interface CartItem {
	productId: string;
	name: string;
	brand: string;
	brandSlug: string;
	price: number;
	size: string;
	color: string;
	quantity: number;
}

export const cart: CartItem[] = $state([]);
