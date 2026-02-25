<svelte:head>
	<title>Products — Antipop</title>
</svelte:head>

<div class="page-header">
	<h2>Products</h2>
	<button>Add product</button>
</div>
<div class="list">
	{#each [
		{ id: 'PRD-001', name: 'Oversized Tee', price: '€29.99', stock: 42, status: 'Active' },
		{ id: 'PRD-002', name: 'Cargo Pants', price: '€59.99', stock: 18, status: 'Active' },
		{ id: 'PRD-003', name: 'Utility Vest', price: '€89.00', stock: 0, status: 'Draft' },
		{ id: 'PRD-004', name: 'Logo Hoodie', price: '€74.99', stock: 25, status: 'Active' }
	] as product}
		<div class="list-row">
			<span class="list-id">{product.id}</span>
			<span class="list-name">{product.name}</span>
			<span class="list-price">{product.price}</span>
			<span class="list-stock">{product.stock} in stock</span>
			<span class="list-status">{product.status}</span>
			<a href="/dashboard/products/{product.id}" class="list-link">Edit</a>
		</div>
	{/each}
</div>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-header button {
		font-size: 0.8rem;
		padding: 0.4rem 1rem;
	}

	.list-name {
		flex: 1;
		font-size: 0.85rem;
	}

	.list-stock {
		width: 80px;
		font-size: 0.8rem;
		color: #888;
	}
</style>
