<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';

	const total = $derived(cart.reduce((s, i) => s + i.price * i.quantity, 0));
</script>

<svelte:head>
	<title>Cart — Antipop</title>
</svelte:head>

<div class="page">
	<h1>Cart</h1>

	{#if cart.length === 0}
		<div class="empty">
			<p>Your cart is empty.</p>
			<a href="/">Continue shopping</a>
		</div>
	{:else}
		<div class="items">
			{#each cart as item, i}
				<div class="item">
					<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
						<rect width="80" height="100" fill="#eee" />
						<text
							x="40"
							y="55"
							text-anchor="middle"
							font-family="monospace"
							font-size="7"
							fill="#ccc">IMG</text
						>
					</svg>

					<div class="item-details">
						<a href="/~{item.brandSlug}" class="item-brand">{item.brand}</a>
						<a href="/p/{item.productId}" class="item-name">{item.name}</a>
						<span class="item-variant">{item.size} / {item.color}</span>
					</div>

					<div class="item-qty">
						<button onclick={() => item.quantity > 1 && item.quantity--}>-</button>
						<span>{item.quantity}</span>
						<button onclick={() => item.quantity++}>+</button>
					</div>

					<span class="item-price">€{(item.price * item.quantity).toFixed(2)}</span>

					<button class="item-remove" onclick={() => cart.splice(i, 1)}>×</button>
				</div>
			{/each}
		</div>

		<div class="summary">
			<span class="total">Total: €{total.toFixed(2)}</span>
			<div class="actions">
				<a href="/" class="continue">Continue shopping</a>
				<a href="/checkout" class="checkout-btn">Proceed to checkout</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	h1 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.empty {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: #666;
	}

	.items {
		display: flex;
		flex-direction: column;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: var(--border);
	}

	.item svg {
		width: 60px;
		height: 75px;
		flex-shrink: 0;
		border: var(--border);
	}

	.item-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.item-brand {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.item-name {
		font-size: 0.85rem;
	}

	.item-variant {
		font-size: 0.75rem;
		color: #888;
	}

	.item-qty {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.item-qty button {
		border: var(--border);
		background: #fff;
		width: 28px;
		height: 28px;
		font-family: monospace;
		font-size: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.item-price {
		width: 80px;
		text-align: right;
		font-weight: bold;
	}

	.item-remove {
		border: none;
		background: none;
		font-size: 1.2rem;
		cursor: pointer;
		color: #999;
		padding: 0 0.25rem;
	}

	.summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
	}

	.total {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.actions {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.continue {
		font-size: 0.85rem;
		color: #666;
	}

	.checkout-btn {
		border: var(--border);
		padding: 0.6rem 1.25rem;
		background: #333;
		color: #fff;
		font-family: monospace;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
