<script lang="ts">
	import { page } from '$app/state';

	const slug = $derived(page.params.slug ?? '');

	const posts = Array.from({ length: 9 }, (_, i) => ({
		id: i + 1,
		product: { id: i + 1, name: `Product ${i + 1}`, brand: `Brand ${(i % 3) + 1}` }
	}));

	const campaigns = [
		{ id: 1, brand: 'Brand 1', name: 'Summer Drop' },
		{ id: 2, brand: 'Brand 2', name: 'Streetwear Collab' }
	];
</script>

<svelte:head>
	<title>@{slug} — Antipop</title>
</svelte:head>

<div class="profile-page">
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
						fill="#bbb">PHOTO</text
					>
				</svg>
			</div>
			<div class="details">
				<h1>@{slug}</h1>
				<p class="bio">
					Placeholder bio for this influencer. Fashion enthusiast, always on the lookout for
					independent brands.
				</p>
				<div class="stats">
					<span>{posts.length} posts</span>
					<span>{campaigns.length} campaigns</span>
				</div>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Posts</h2>
		<div class="grid-3">
			{#each posts as post}
				<a href="/~{slug}/p/{post.id}" class="post-card">
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
				</a>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>Campaigns</h2>
		<div class="campaign-list">
			{#each campaigns as campaign}
				<div class="campaign-card">
					<span class="campaign-brand">{campaign.brand}</span>
					<span class="campaign-name">{campaign.name}</span>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.profile-page {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	/* Info */
	.info {
		border-bottom: var(--border);
		padding: 2rem var(--gap);
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
		border-radius: 50%;
		overflow: hidden;
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

	.bio {
		font-size: 0.85rem;
		color: #666;
		line-height: 1.5;
	}

	.stats {
		display: flex;
		gap: 1.5rem;
		font-size: 0.8rem;
		color: #999;
	}

	/* Sections */
	.section {
		padding: 2rem var(--gap);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.post-card {
		border: var(--border);
		display: block;
		overflow: hidden;
	}

	.post-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Campaigns */
	.campaign-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.campaign-card {
		border: var(--border);
		padding: 0.75rem 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.campaign-brand {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.campaign-name {
		font-size: 0.85rem;
	}
</style>
