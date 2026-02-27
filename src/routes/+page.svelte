<script lang="ts">
	const brands = Array.from({ length: 6 }, (_, i) => ({
		id: i + 1,
		name: `Brand ${i + 1}`,
		slug: `brand-${i + 1}`
	}));

	const posts = [
		{ id: 1, slug: 'fashionista', author: '@fashionista' },
		{ id: 2, slug: 'streetstyle_bg', author: '@streetstyle_bg' },
		{ id: 3, slug: 'minimalist.jane', author: '@minimalist.jane' },
		{ id: 4, slug: 'urbanfit', author: '@urbanfit' },
		{ id: 5, slug: 'fashionista', author: '@fashionista' },
		{ id: 6, slug: 'streetstyle_bg', author: '@streetstyle_bg' },
		{ id: 7, slug: 'minimalist.jane', author: '@minimalist.jane' },
		{ id: 8, slug: 'urbanfit', author: '@urbanfit' }
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
			<a href="/c/men" class="category-card">
				<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
					<rect width="400" height="300" fill="#eee" />
					<text
						x="200"
						y="155"
						text-anchor="middle"
						font-family="monospace"
						font-size="24"
						fill="#999">Men</text
					>
				</svg>
			</a>
			<a href="/c/women" class="category-card">
				<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
					<rect width="400" height="300" fill="#eee" />
					<text
						x="200"
						y="155"
						text-anchor="middle"
						font-family="monospace"
						font-size="24"
						fill="#999">Women</text
					>
				</svg>
			</a>
			<a href="/c/kids" class="category-card">
				<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
					<rect width="400" height="300" fill="#eee" />
					<text
						x="200"
						y="155"
						text-anchor="middle"
						font-family="monospace"
						font-size="24"
						fill="#999">Kids</text
					>
				</svg>
			</a>
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
		<h2>Posts</h2>
		<div class="grid-4">
			{#each posts as post}
				<a href="/@{post.slug}/p/{post.id}" class="post-card">
					<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
						<rect width="300" height="300" fill="#eee" />
						<text
							x="150"
							y="150"
							text-anchor="middle"
							font-family="monospace"
							font-size="14"
							fill="#bbb">300 × 300</text
						>
					</svg>
					<span class="post-author">{post.author}</span>
				</a>
			{/each}
		</div>
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

	.category-card:hover {
		text-decoration: none;
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

	.post-card {
		border: var(--border);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.post-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.post-author {
		font-size: 0.8rem;
		padding: 0.5rem 0.75rem;
		color: #666;
	}
</style>
