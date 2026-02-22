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

	<section class="profile-info">
		<div class="profile-info-inner">
			<div class="profile-avatar">
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
			<div class="profile-details">
				<h1>~{slug}</h1>
				<p class="profile-description">
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

	.links {
		display: flex;
		gap: 1rem;
		font-size: 0.8rem;
	}
</style>
