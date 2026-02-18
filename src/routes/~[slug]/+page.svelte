<script lang="ts">
	import { page } from '$app/state';

	const slug = $derived(page.params.slug);

	const products = Array.from({ length: 8 }, (_, i) => ({
		id: i + 1,
		name: `Product ${i + 1}`,
		price: (29.99 + i * 15).toFixed(2)
	}));

	const links = [
		{ label: 'Instagram', href: '#' },
		{ label: 'Website', href: '#' }
	];
</script>

<svelte:head>
	<title>~{slug} — Antipop</title>
</svelte:head>

<div class="brand-page">
	<section class="hero">
		<svg viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
			<rect width="1200" height="300" fill="#e8e8e8" />
			<text
				x="600"
				y="150"
				text-anchor="middle"
				font-family="monospace"
				font-size="24"
				fill="#999">BRAND COVER IMAGE</text
			>
		</svg>
	</section>

	<section class="info">
		<div class="info-inner">
			<div class="avatar">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<rect width="100" height="100" fill="#eee" />
					<text
						x="50"
						y="55"
						text-anchor="middle"
						font-family="monospace"
						font-size="10"
						fill="#bbb">LOGO</text
					>
				</svg>
			</div>
			<div class="details">
				<h1>~{slug}</h1>
				<p class="description">
					This is a placeholder description for the brand. It tells customers what the brand is
					about, its style and philosophy.
				</p>
				<div class="links">
					{#each links as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="section">
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
						<span class="product-name">{product.name}</span>
						<span class="product-price">€{product.price}</span>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.brand-page {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.hero svg {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Brand info */
	.info {
		border-bottom: var(--border);
		padding: 1.5rem var(--gap);
	}

	.info-inner {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.avatar {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
		border: var(--border);
	}

	.avatar svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h1 {
		font-size: 1.1rem;
		letter-spacing: 0.05em;
	}

	.description {
		font-size: 0.85rem;
		color: #666;
		line-height: 1.5;
	}

	.links {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
	}

	/* Products */
	.section {
		padding: 2rem var(--gap);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

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

	.product-name {
		font-size: 0.85rem;
	}

	.product-price {
		font-weight: bold;
	}
</style>
