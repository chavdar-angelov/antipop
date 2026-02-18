<script lang="ts">
	import { page } from '$app/state';

	const id = $derived(page.params.id ?? '');

	const post = {
		influencer: { name: 'Jane', slug: 'jane' },
		products: [
			{ id: 1, name: 'Oversized Tee', brand: 'Brand 1', brandSlug: 'brand-1', price: '39.99' },
			{ id: 2, name: 'Cargo Pants', brand: 'Brand 2', brandSlug: 'brand-2', price: '69.99' },
			{ id: 3, name: 'Canvas Sneakers', brand: 'Brand 1', brandSlug: 'brand-1', price: '89.99' }
		]
	};
</script>

<svelte:head>
	<title>Post {id} by @{post.influencer.name} — Antipop</title>
</svelte:head>

<div class="post-page">
	<div class="photo">
		<svg viewBox="0 0 600 750" xmlns="http://www.w3.org/2000/svg">
			<rect width="600" height="750" fill="#eee" />
			<text
				x="300"
				y="375"
				text-anchor="middle"
				font-family="monospace"
				font-size="18"
				fill="#bbb">POST PHOTO</text
			>
		</svg>
	</div>

	<div class="sidebar">
		<div class="author">
			<span class="author-label">Posted by</span>
			<a href="/@{post.influencer.slug}">@{post.influencer.name}</a>
		</div>

		<h2>Tagged products</h2>

		<div class="tagged-products">
			{#each post.products as product}
				<a href="/p/{product.id}" class="tagged-item">
					<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
						<rect width="80" height="100" fill="#eee" />
						<text
							x="40"
							y="55"
							text-anchor="middle"
							font-family="monospace"
							font-size="7"
							fill="#ccc">IMG</text
						>
					</svg>
					<div class="tagged-info">
						<span class="tagged-brand">{product.brand}</span>
						<span class="tagged-name">{product.name}</span>
						<span class="tagged-price">€{product.price}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.post-page {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	.photo svg {
		display: block;
		width: 100%;
		height: auto;
		border: var(--border);
	}

	/* Sidebar */
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.author {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.author-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.author a {
		font-size: 1rem;
		font-weight: bold;
	}

	/* Tagged products */
	.tagged-products {
		display: flex;
		flex-direction: column;
	}

	.tagged-item {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: var(--border);
	}

	.tagged-item svg {
		width: 60px;
		height: 75px;
		flex-shrink: 0;
		border: var(--border);
	}

	.tagged-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.tagged-brand {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.tagged-name {
		font-size: 0.85rem;
	}

	.tagged-price {
		font-weight: bold;
	}
</style>
