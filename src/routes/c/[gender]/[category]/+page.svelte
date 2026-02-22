<script lang="ts">
	import { page } from '$app/state';

	const gender = $derived(page.params.gender ?? '');
	const category = $derived(page.params.category ?? '');

	const subcategories: Record<string, string[]> = {
		shoes: ['Sneakers', 'Boots', 'Sandals', 'Loafers'],
		't-shirts': ['Graphic', 'Plain', 'Oversized', 'Cropped'],
		pants: ['Jeans', 'Cargo', 'Chinos', 'Shorts'],
		jackets: ['Denim', 'Bomber', 'Puffer', 'Leather'],
		hoodies: ['Zip-up', 'Pullover', 'Oversized'],
		accessories: ['Hats', 'Belts', 'Sunglasses', 'Jewellery'],
		dresses: ['Mini', 'Midi', 'Maxi', 'Shirt dress'],
		tops: ['Blouses', 'Crop tops', 'Tank tops', 'Knits'],
		bags: ['Tote', 'Crossbody', 'Backpack', 'Clutch'],
		sets: ['Tracksuit', 'Matching', 'Pyjama']
	};

	const subs = $derived(category ? (subcategories[category] ?? []) : []);

	const products = Array.from({ length: 8 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1}`,
		brand: `Brand ${(i % 4) + 1}`,
		price: (24.99 + i * 12).toFixed(2)
	}));
</script>

<svelte:head>
	<title>{category} — {gender} — Antipop</title>
</svelte:head>

<div class="category-page">
	<div class="breadcrumb">
		<a href="/">Home</a> / <a href="/c/{gender}">{gender}</a> / <span>{category}</span>
	</div>

	<h1>{category}</h1>

	{#if subs.length > 0}
		<section class="section">
			<h2>Subcategories</h2>
			<div class="subcategories">
				{#each subs as sub}
					<a href="/c/{gender}/{category}/{sub.toLowerCase().replace(/ /g, '-')}" class="subcategory">
						{sub}
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<section class="section">
		<h2>All {category}</h2>
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

	.subcategories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.subcategory {
		border: var(--border);
		padding: 0.4rem 0.85rem;
		font-size: 0.85rem;
	}

	.subcategory:hover {
		background: #333;
		color: #fff;
		text-decoration: none;
	}
</style>
