<script lang="ts">
	import { page } from '$app/state';

	const gender = $derived(page.params.gender ?? '');

	const genderCategories: Record<string, Record<string, string[]>> = {
		men: {
			clothes: [
				'T-shirts',
				'Shirts',
				'Pants',
				'Jeans',
				'Shorts',
				'Jackets',
				'Coats',
				'Hoodies',
				'Sweaters & cardigans',
				'Suits & blazers',
				'Swimwear',
				'Underwear'
			],
			shoes: ['Sneakers', 'Boots', 'Sandals', 'Low shoes', 'Slippers', 'Sports shoes'],
			accessories: [
				'Bags & backpacks',
				'Hats & caps',
				'Belts',
				'Wallets & cases',
				'Watches',
				'Sunglasses',
				'Scarves',
				'Gloves'
			]
		},
		women: {
			clothes: [
				'Dresses',
				'Blouses & tunics',
				'Tops',
				'T-shirts',
				'Skirts',
				'Pants',
				'Jeans',
				'Shorts',
				'Jackets',
				'Coats',
				'Blazers',
				'Hoodies',
				'Sweaters & cardigans',
				'Jumpsuits',
				'Swimwear',
				'Underwear'
			],
			shoes: [
				'Sneakers',
				'Ankle boots',
				'Boots',
				'Sandals',
				'High heels',
				'Ballet flats',
				'Low shoes',
				'Slippers',
				'Sports shoes'
			],
			accessories: [
				'Bags & backpacks',
				'Jewellery',
				'Scarves & wraps',
				'Belts',
				'Wallets & cases',
				'Sunglasses',
				'Hats & caps',
				'Hair accessories',
				'Gloves'
			]
		},
		kids: {
			clothes: [
				'T-shirts',
				'Tops',
				'Pants',
				'Jeans',
				'Shorts',
				'Dresses',
				'Skirts',
				'Jackets & coats',
				'Sweaters',
				'Hoodies',
				'Sets',
				'Bodysuits',
				'Underwear'
			],
			shoes: ['Sneakers', 'Boots', 'Sandals', 'Rain boots', 'Slippers', 'Sports shoes'],
			accessories: ['Bags', 'Hats & caps', 'Scarves', 'Sunglasses', 'Gloves']
		}
	};

	const categories = $derived(genderCategories[gender] ?? genderCategories.men);

	let open = $state<string | null>(null);

	function toggle(cat: string) {
		open = open === cat ? null : cat;
	}

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
		<div class="categories">
			{#each Object.entries(categories) as [cat, subs]}
				<div class="dropdown" class:open={open === cat}>
					<button class="cat-btn" onclick={() => toggle(cat)}>
						<a href="/c/{gender}/{cat}">{cat}</a>
						<span class="arrow">{open === cat ? '−' : '+'}</span>
					</button>
					{#if open === cat}
						<div class="dropdown-menu">
							{#each subs as sub}
								<a href="/c/{gender}/{cat}/{sub.toLowerCase().replace(/ /g, '-')}">{sub}</a>
							{/each}
						</div>
					{/if}
				</div>
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

	.categories {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
	}

	.dropdown {
		position: relative;
	}

	.cat-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: var(--border);
		padding: 0.4rem 0.85rem;
		background: #fff;
		color: #333;
		font-family: monospace;
		font-size: 0.85rem;
		cursor: pointer;
		text-transform: capitalize;
	}

	.cat-btn a {
		text-transform: capitalize;
	}

	.cat-btn a:hover {
		text-decoration: underline;
	}

	.open .cat-btn {
		background: #333;
		color: #fff;
	}

	.open .cat-btn a {
		color: #fff;
	}

	.arrow {
		font-size: 0.75rem;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 2px;
		border: var(--border);
		background: #fff;
		display: flex;
		flex-direction: column;
		min-width: 160px;
		z-index: 10;
	}

	.dropdown-menu a {
		padding: 0.5rem 0.85rem;
		font-size: 0.8rem;
		border-bottom: var(--border);
	}

	.dropdown-menu a:last-child {
		border-bottom: none;
	}

	.dropdown-menu a:hover {
		background: #f5f5f5;
		text-decoration: none;
	}
</style>
