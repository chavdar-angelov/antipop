<svelte:head>
	<title>Favourites — Antipop</title>
</svelte:head>

<h2>Favourites</h2>
<div class="grid-4">
	{#each [
		{ id: 1, name: 'Oversized Tee', brand: 'Brand 1', price: '€29.99' },
		{ id: 3, name: 'Cargo Pants', brand: 'Brand 3', price: '€59.99' },
		{ id: 5, name: 'Utility Vest', brand: 'Brand 4', price: '€89.00' }
	] as item}
		<a href="/p/{item.id}" class="product-card">
			<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
				<rect width="300" height="380" fill="#eee" />
				<text
					x="150"
					y="190"
					text-anchor="middle"
					font-family="monospace"
					font-size="14"
					fill="#bbb">300 × 380</text
				>
			</svg>
			<div class="product-info">
				<span class="product-brand">{item.brand}</span>
				<span class="product-name">{item.name}</span>
				<span class="product-price">{item.price}</span>
			</div>
		</a>
	{/each}
</div>
