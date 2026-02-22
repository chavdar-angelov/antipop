<script lang="ts">
	import { page } from '$app/state';

	const gender = $derived(page.params.gender ?? '');

	const categories: Record<string, string[]> = {
		men: ['Shoes', 'T-shirts', 'Pants', 'Jackets', 'Hoodies', 'Accessories'],
		women: ['Shoes', 'Dresses', 'Tops', 'Pants', 'Jackets', 'Bags'],
		kids: ['Shoes', 'T-shirts', 'Pants', 'Jackets', 'Sets']
	};

	const items = $derived(categories[gender] ?? []);

	const products = Array.from({ length: 8 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1}`,
		brand: `Brand ${(i % 4) + 1}`,
		price: (19.99 + i * 10).toFixed(2)
	}));
</script>

<svelte:head>
	<title>{gender} — Antipop</title>
</svelte:head>

<div class="category-page">
	<div class="breadcrumb">
		<a href="/">Home</a> / <span>{gender}</span>
	</div>

	<h1>{gender}</h1>

	<section class="section">
		<h2>Categories</h2>
		<div class="grid-3">
			{#each items as cat}
				<a href="/c/{gender}/{cat.toLowerCase()}" class="product-card">
					<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
						<rect width="300" height="200" fill="#eee" />
						<text
							x="150"
							y="105"
							text-anchor="middle"
							font-family="monospace"
							font-size="16"
							fill="#999">{cat}</text
						>
					</svg>
				</a>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>All {gender}</h2>
		<div class="grid-4">
			{#each products as product}
				<a href="/p/{product.id}" class="product-card">
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
						<span class="product-brand">{product.brand}</span>
						<span class="product-name">{product.name}</span>
						<span class="product-price">€{product.price}</span>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.category-page {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.breadcrumb {
		font-size: 0.8rem;
		color: #888;
		text-transform: capitalize;
	}

	h1 {
		text-transform: capitalize;
	}
</style>
