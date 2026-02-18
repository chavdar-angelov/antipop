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

	const posts = [
		{
			id: 1,
			user: { name: 'maya.style', avatar: 'M' },
			product: { id: 3, name: 'Oversized Tee', brand: 'Brand 1' },
			caption: 'This tee is everything. Paired it with wide legs and platforms.',
			likes: 234
		},
		{
			id: 2,
			user: { name: 'jkwear', avatar: 'J' },
			product: { id: 7, name: 'Cargo Pants', brand: 'Brand 3' },
			caption: 'Finally found cargos that actually fit right. The quality is insane.',
			likes: 189
		},
		{
			id: 3,
			user: { name: 'noa.fits', avatar: 'N' },
			product: { id: 1, name: 'Graphic Hoodie', brand: 'Brand 2' },
			caption: 'Cozy season starter. This hoodie runs oversized — I love it.',
			likes: 412
		},
		{
			id: 4,
			user: { name: 'alex.drip', avatar: 'A' },
			product: { id: 5, name: 'Utility Vest', brand: 'Brand 4' },
			caption: 'Layering piece of the year. Works with literally anything.',
			likes: 167
		}
	];
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
		<div class="grid-3">
			{#each categories as cat}
				<a href="/c/{cat.toLowerCase()}" class="product-card">
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
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Worn by</h2>
		<div class="posts">
			{#each posts as post}
				<div class="post">
					<div class="post-header">
						<span class="post-avatar">{post.user.avatar}</span>
						<a href="/@{post.user.name}" class="post-user">{post.user.name}</a>
					</div>
					<a href="/~{post.user.name}/p/{post.id}">
						<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
							<rect width="300" height="380" fill="#f0ede8" />
							<text
								x="150"
								y="180"
								text-anchor="middle"
								font-family="monospace"
								font-size="14"
								fill="#c4b8a8">PHOTO</text
							>
						</svg>
					</a>
					<div class="post-body">
						<p class="post-caption">{post.caption}</p>
						<a href="/p/{post.product.id}" class="post-product">
							{post.product.brand} — {post.product.name}
						</a>
						<span class="post-likes">{post.likes} likes</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="inner">
		<h2>Brands</h2>
		<div class="grid-6">
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

	/* Influencer posts */
	.posts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--gap);
	}

	.post {
		border: var(--border);
		background: #fff;
		overflow: hidden;
	}

	.post-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.75rem;
	}

	.post-avatar {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #333;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.65rem;
		font-weight: bold;
	}

	.post-user {
		font-size: 0.8rem;
		font-weight: bold;
	}

	.post svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.post-body {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.post-caption {
		font-size: 0.8rem;
		line-height: 1.5;
		color: #444;
	}

	.post-product {
		font-size: 0.75rem;
		color: #999;
	}

	.post-likes {
		font-size: 0.7rem;
		color: #aaa;
	}

	.newsletter {
		border-top: var(--border);
		padding-top: 2rem;
	}

	.newsletter p {
		color: #777;
	}

	.newsletter-form {
		flex-direction: row;
		max-width: 400px;
	}

	.newsletter-form input {
		flex: 1;
	}

	.newsletter-form button {
		padding: 0.5rem 1rem;
	}
</style>
