<script lang="ts">
	import { cart } from '$lib/client/cart.svelte';

	const total = $derived(cart.reduce((s, i) => s + i.price * i.quantity, 0));

	let placed = $state(false);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		cart.length = 0;
		placed = true;
	}
</script>

<svelte:head>
	<title>Checkout — Antipop</title>
</svelte:head>

<div class="page">
	{#if placed}
		<div class="confirmation">
			<h1>Order placed</h1>
			<p>Thank you for your order. The brand owner will contact you about payment and delivery.</p>
			<a href="/">Back to shop</a>
		</div>
	{:else if cart.length === 0}
		<div class="empty">
			<h1>Checkout</h1>
			<p>Your cart is empty.</p>
			<a href="/">Continue shopping</a>
		</div>
	{:else}
		<h1>Checkout</h1>

		<div class="layout">
			<form onsubmit={handleSubmit}>
				<h2>Shipping address</h2>

				<div class="row">
					<label>
						First name
						<input type="text" required />
					</label>
					<label>
						Last name
						<input type="text" required />
					</label>
				</div>

				<label>
					Street address
					<input type="text" required />
				</label>

				<div class="row">
					<label>
						City
						<input type="text" required />
					</label>
					<label>
						Postal code
						<input type="text" required />
					</label>
				</div>

				<label>
					Country
					<input type="text" required />
				</label>

				<label>
					Phone (optional)
					<input type="tel" />
				</label>

				<button type="submit">Place order</button>
			</form>

			<div class="summary">
				<h2>Order summary</h2>
				<div class="summary-items">
					{#each cart as item}
						<div class="summary-item">
							<span class="summary-name">
								{item.name} — {item.size} / {item.color} ×{item.quantity}
							</span>
							<span class="summary-price">€{(item.price * item.quantity).toFixed(2)}</span>
						</div>
					{/each}
				</div>
				<div class="summary-total">
					<span>Total</span>
					<span>€{total.toFixed(2)}</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.empty,
	.confirmation {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.confirmation p {
		color: #666;
		line-height: 1.5;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.summary {
		border: var(--border);
		padding: 1.5rem;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-self: flex-start;
	}

	.summary-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.summary-item {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.85rem;
	}

	.summary-name {
		color: #666;
	}

	.summary-price {
		white-space: nowrap;
	}

	.summary-total {
		display: flex;
		justify-content: space-between;
		border-top: var(--border);
		padding-top: 0.75rem;
		font-weight: bold;
	}
</style>
