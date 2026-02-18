<script lang="ts">
	const categories = ['Men', 'Women', 'Accessories'];

	const products = Array.from({ length: 12 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1}`,
		brand: `Brand ${(i % 4) + 1}`,
		price: (19.99 + i * 10).toFixed(2)
	}));

	const brands = Array.from({ length: 6 }, (_, i) => ({
		id: i + 1,
		name: `Brand ${i + 1}`,
		slug: `brand-${i + 1}`
	}));

	const tags = ['Winter', 'Streetwear', 'Vintage', 'Minimal', 'Bold', 'Essentials'];
</script>

<svelte:head>
	<title>Antipop — Independent Clothing Marketplace</title>
</svelte:head>

<section class="hero">
	<div class="hero-inner">
		<svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
			<rect width="1200" height="400" fill="#e8e8e8" />
			<text x="600" y="180" text-anchor="middle" font-family="monospace" font-size="32" fill="#999"
				>HERO BANNER</text
			>
			<text x="600" y="230" text-anchor="middle" font-family="monospace" font-size="16" fill="#aaa"
				>Independent brands, one place.</text
			>
		</svg>
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Categories</h2>
		<div class="categories">
			{#each categories as cat}
				<a href="/c/{cat.toLowerCase()}" class="category-card">
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
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Products</h2>
		<div class="product-grid">
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
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Brands</h2>
		<div class="brands-row">
			{#each brands as brand}
				<a href="/~{brand.slug}" class="brand-card">
					<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
						<rect width="160" height="160" fill="#eee" />
						<text
							x="80"
							y="75"
							text-anchor="middle"
							font-family="monospace"
							font-size="12"
							fill="#bbb">LOGO</text
						>
					</svg>
					<span>{brand.name}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Trending Tags</h2>
		<div class="tags">
			{#each tags as tag}
				<a href="/t/{tag.toLowerCase()}" class="tag">#{tag}</a>
			{/each}
		</div>
	</div>
</section>

<section class="section newsletter">
	<div class="inner">
		<h2>Stay in the loop</h2>
		<p>Get notified about new brands and drops.</p>
		<form class="newsletter-form" onsubmit={(e) => e.preventDefault()}>
			<input type="email" placeholder="your@email.com" />
			<button type="submit">Subscribe</button>
		</form>
	</div>
</section>

<style>
	.hero {
		border-bottom: var(--border);
	}

	.hero-inner {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.hero svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.section {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* Categories */
	.categories {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
	}

	.category-card {
		border: var(--border);
		display: block;
		overflow: hidden;
	}

	.category-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Product grid */
	.product-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap);
	}

	.product-card {
		border: var(--border);
		display: block;
		overflow: hidden;
	}

	.product-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.product-info {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-top: var(--border);
	}

	.product-brand {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.product-name {
		font-size: 0.85rem;
	}

	.product-price {
		font-weight: bold;
	}

	/* Brands */
	.brands-row {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--gap);
	}

	.brand-card {
		border: var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding-bottom: 0.75rem;
		overflow: hidden;
	}

	.brand-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.brand-card span {
		font-size: 0.8rem;
	}

	/* Tags */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		border: var(--border);
		padding: 0.4rem 0.85rem;
		font-size: 0.85rem;
	}

	/* Newsletter */
	.newsletter {
		border-top: var(--border);
		padding-top: 2rem;
	}

	.newsletter p {
		color: #777;
	}

	.newsletter-form {
		display: flex;
		gap: 0.5rem;
		max-width: 400px;
	}

	.newsletter-form input {
		flex: 1;
		border: var(--border);
		padding: 0.5rem;
		font-family: monospace;
		font-size: 0.85rem;
		background: #fff;
	}

	.newsletter-form button {
		border: var(--border);
		padding: 0.5rem 1rem;
		background: #333;
		color: #fff;
		font-family: monospace;
		font-size: 0.85rem;
		cursor: pointer;
	}
</style>
