<script lang="ts">
	import { page } from '$app/state';
	import { cart } from '$lib/client/cart.svelte';

	const id = $derived(page.params.id ?? '');

	const product = {
		name: 'Product Name',
		brand: { name: 'Brand Name', slug: 'brand-name' },
		description:
			'This is a placeholder product description. It covers material, fit and styling details that help customers make a purchasing decision.',
		price: '49.99',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: ['Black', 'White', 'Grey'],
		tags: ['Streetwear', 'Essentials']
	};

	let selectedSize = $state('');
	let selectedColor = $state('');
	let added = $state(false);

	function handleAddToCart() {
		cart.push({
			productId: id,
			name: product.name,
			brand: product.brand.name,
			brandSlug: product.brand.slug,
			price: parseFloat(product.price),
			size: selectedSize,
			color: selectedColor,
			quantity: 1
		});
		added = true;
		setTimeout(() => (added = false), 1500);
	}
</script>

<svelte:head>
	<title>{product.name} — Antipop</title>
</svelte:head>

<div class="product-page">
	<div class="gallery">
		<svg viewBox="0 0 600 760" xmlns="http://www.w3.org/2000/svg">
			<rect width="600" height="760" fill="#eee" />
			<text
				x="300"
				y="380"
				text-anchor="middle"
				font-family="monospace"
				font-size="18"
				fill="#bbb">PRODUCT IMAGE</text
			>
		</svg>
		<div class="thumbs">
			{#each Array(4) as _, i}
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<rect width="100" height="100" fill="#eee" />
					<text
						x="50"
						y="55"
						text-anchor="middle"
						font-family="monospace"
						font-size="8"
						fill="#ccc">{i + 1}</text
					>
				</svg>
			{/each}
		</div>
	</div>

	<div class="details">
		<a href="/~{product.brand.slug}" class="brand-link">{product.brand.name}</a>
		<h1>{product.name}</h1>
		<p class="price">€{product.price}</p>
		<p class="id">ID: {id}</p>

		<div class="option">
			<span class="option-label">Size</span>
			<div class="option-list">
				{#each product.sizes as size}
					<button
						class="option-btn"
						class:selected={selectedSize === size}
						onclick={() => (selectedSize = size)}
					>
						{size}
					</button>
				{/each}
			</div>
		</div>

		<div class="option">
			<span class="option-label">Color</span>
			<div class="option-list">
				{#each product.colors as color}
					<button
						class="option-btn"
						class:selected={selectedColor === color}
						onclick={() => (selectedColor = color)}
					>
						{color}
					</button>
				{/each}
			</div>
		</div>

		<button
			class="add-to-cart"
			disabled={!selectedSize || !selectedColor}
			onclick={handleAddToCart}
		>
			{added ? 'Added!' : 'Add to cart'}
		</button>

		<div class="description">
			<h2>Description</h2>
			<p>{product.description}</p>
		</div>

		<div class="tags">
			{#each product.tags as tag}
				<span class="tag">#{tag}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.product-page {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	/* Gallery */
	.gallery svg {
		display: block;
		width: 100%;
		height: auto;
		border: var(--border);
	}

	.thumbs {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.thumbs svg {
		width: 60px;
		height: 60px;
		border: var(--border);
		cursor: pointer;
	}

	/* Details */
	.details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.brand-link {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	h1 {
		font-size: 1.25rem;
	}

	.price {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.id {
		font-size: 0.75rem;
		color: #aaa;
	}

	/* Options */
	.option {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.option-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}

	.option-list {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.option-btn {
		border: var(--border);
		padding: 0.4rem 0.85rem;
		background: #fff;
		color: #333;
		font-family: monospace;
		font-size: 0.85rem;
		cursor: pointer;
	}

	.option-btn.selected {
		background: #333;
		color: #fff;
		border-color: #333;
	}

	/* Add to cart */
	.add-to-cart {
		border: var(--border);
		padding: 0.75rem;
		background: #333;
		color: #fff;
		font-family: monospace;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		cursor: pointer;
	}

	.add-to-cart:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* Description */
	.description {
		border-top: var(--border);
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.description p {
		font-size: 0.85rem;
		color: #666;
		line-height: 1.6;
	}

</style>
