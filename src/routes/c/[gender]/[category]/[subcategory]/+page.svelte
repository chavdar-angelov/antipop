<script lang="ts">
	import { page } from '$app/state';

	const gender = $derived(page.params.gender);
	const category = $derived(page.params.category);
	const subcategory = $derived(page.params.subcategory);

	const products = Array.from({ length: 8 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1}`,
		brand: `Brand ${(i % 4) + 1}`,
		price: (29.99 + i * 8).toFixed(2)
	}));
</script>

<svelte:head>
	<title>{subcategory} — {category} — {gender} — Antipop</title>
</svelte:head>

<div class="category-page">
	<div class="breadcrumb">
		<a href="/">Home</a> /
		<a href="/c/{gender}">{gender}</a> /
		<a href="/c/{gender}/{category}">{category}</a> /
		<span>{subcategory}</span>
	</div>

	<h1>{subcategory}</h1>

	<section class="section">
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
