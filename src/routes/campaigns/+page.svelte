<script lang="ts">
	const campaigns = [
		{
			id: 1,
			name: 'Summer Streetwear Drop',
			discount: 20,
			brand: { name: 'Urban Edge', slug: 'urban-edge' }
		},
		{
			id: 2,
			name: 'Vintage Revival Collection',
			discount: 15,
			brand: { name: 'Retro Thread', slug: 'retro-thread' }
		},
		{
			id: 3,
			name: 'Minimalist Essentials',
			discount: 25,
			brand: { name: 'Plain Studio', slug: 'plain-studio' }
		},
		{
			id: 4,
			name: 'Bold Print Season',
			discount: 10,
			brand: { name: 'Chromatic', slug: 'chromatic' }
		},
		{
			id: 5,
			name: 'Eco-Friendly Basics',
			discount: 30,
			brand: { name: 'Green Label', slug: 'green-label' }
		},
		{
			id: 6,
			name: 'Y2K Comeback',
			discount: 20,
			brand: { name: 'Flashback', slug: 'flashback' }
		}
	];
</script>

<svelte:head>
	<title>Campaigns — Antipop</title>
</svelte:head>

<div class="page">
	<h1>Active campaigns</h1>

	<section class="how-it-works">
		<h2>How it works</h2>
		<div class="steps">
			<div class="step">
				<span class="step-number">1</span>
				<p>Browse active campaigns from independent brands</p>
			</div>
			<div class="step">
				<span class="step-number">2</span>
				<p>Join a campaign and get an exclusive discount code</p>
			</div>
			<div class="step">
				<span class="step-number">3</span>
				<p>Share your style on social media and earn rewards</p>
			</div>
		</div>
		<button class="cta">Show your style</button>
	</section>

	<section class="section">
		<div class="grid-2">
			{#each campaigns as campaign}
				<div class="campaign-card">
					<div class="campaign-header">
						<a href="/~{campaign.brand.slug}" class="campaign-brand-logo">
							<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
								<rect width="48" height="48" fill="#eee" />
								<text
									x="24"
									y="28"
									text-anchor="middle"
									font-family="monospace"
									font-size="7"
									fill="#bbb">LOGO</text
								>
							</svg>
						</a>
						<div class="campaign-info">
							<span class="campaign-name">{campaign.name}</span>
							<a href="/~{campaign.brand.slug}" class="campaign-brand-name"
								>{campaign.brand.name}</a
							>
						</div>
					</div>
					<div class="campaign-footer">
						<span class="campaign-discount">{campaign.discount}% off</span>
						<button class="join-btn">Join</button>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.how-it-works {
		border: var(--border);
		padding: 1.5rem;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.steps {
		display: flex;
		gap: 2rem;
	}

	.step {
		display: flex;
		gap: 0.75rem;
		align-items: baseline;
		flex: 1;
	}

	.step-number {
		font-size: 1.25rem;
		font-weight: bold;
		color: #999;
		flex-shrink: 0;
	}

	.step p {
		font-size: 0.85rem;
		color: #666;
	}

	.cta {
		align-self: flex-start;
	}

	.campaign-card {
		border: var(--border);
		background: #fff;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.campaign-header {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.campaign-brand-logo {
		width: 48px;
		height: 48px;
		flex-shrink: 0;
		border: var(--border);
		display: block;
	}

	.campaign-brand-logo svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.campaign-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.campaign-name {
		font-size: 0.9rem;
		font-weight: bold;
	}

	.campaign-brand-name {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.campaign-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: var(--border);
		padding-top: 0.75rem;
	}

	.campaign-discount {
		font-size: 0.9rem;
		font-weight: bold;
	}

	.join-btn {
		padding: 0.4rem 1.25rem;
		font-size: 0.8rem;
	}
</style>
