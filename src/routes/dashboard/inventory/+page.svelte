<svelte:head>
	<title>Inventory — Antipop</title>
</svelte:head>

<h2>Inventory</h2>
<div class="list">
	{#each [
		{ sku: 'TEE-BLK-M', product: 'Oversized Tee', variant: 'Black / M', stock: 15 },
		{ sku: 'TEE-BLK-L', product: 'Oversized Tee', variant: 'Black / L', stock: 8 },
		{ sku: 'TEE-WHT-M', product: 'Oversized Tee', variant: 'White / M', stock: 0 },
		{ sku: 'CRG-GRN-32', product: 'Cargo Pants', variant: 'Green / 32', stock: 12 },
		{ sku: 'CRG-GRN-34', product: 'Cargo Pants', variant: 'Green / 34', stock: 6 },
		{ sku: 'HDI-GRY-L', product: 'Logo Hoodie', variant: 'Grey / L', stock: 25 }
	] as item}
		<div class="list-row">
			<span class="list-sku">{item.sku}</span>
			<span class="list-product">{item.product}</span>
			<span class="list-variant">{item.variant}</span>
			<span class="list-stock" class:out-of-stock={item.stock === 0}>
				{item.stock === 0 ? 'Out of stock' : `${item.stock} in stock`}
			</span>
		</div>
	{/each}
</div>

<style>
	.list-sku {
		width: 100px;
		font-size: 0.8rem;
		font-weight: bold;
		color: #888;
	}

	.list-product {
		flex: 1;
		font-size: 0.85rem;
	}

	.list-variant {
		width: 100px;
		font-size: 0.8rem;
		color: #888;
	}

	.list-stock {
		width: 90px;
		font-size: 0.8rem;
		text-align: right;
	}

	.out-of-stock {
		color: #c00;
		font-weight: bold;
	}
</style>
