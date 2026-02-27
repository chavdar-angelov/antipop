<script lang="ts">
	import { page } from '$app/state';

	const slug = $derived(page.params.slug ?? '');

	let following = $state(false);
	const followers = 248;

	const posts = Array.from({ length: 9 }, (_, i) => ({
		id: i + 1,
		likes: Math.floor(Math.random() * 300) + 10,
		product: { id: i + 1, name: `Product ${i + 1}`, brand: `Brand ${(i % 3) + 1}` }
	}));

	const campaigns = [
		{ id: 1, brand: 'Brand 1', name: 'Summer Drop' },
		{ id: 2, brand: 'Brand 2', name: 'Streetwear Collab' }
	];

	// Create post modal
	let showCreatePost = $state(false);
	let createStep = $state(1);
	let postImages: number[] = $state([]);
	let postDescription = $state('');
	let postTags = $state('');
	let taggedProducts: { id: number; name: string; brand: string }[] = $state([]);
	let productSearch = $state('');

	const allProducts = [
		{ id: 101, name: 'Oversized Tee', brand: 'Brand 1' },
		{ id: 102, name: 'Cargo Pants', brand: 'Brand 2' },
		{ id: 103, name: 'Canvas Sneakers', brand: 'Brand 1' },
		{ id: 104, name: 'Denim Jacket', brand: 'Brand 3' },
		{ id: 105, name: 'Bucket Hat', brand: 'Brand 2' },
		{ id: 106, name: 'Linen Shirt', brand: 'Brand 1' },
		{ id: 107, name: 'Track Pants', brand: 'Brand 3' },
		{ id: 108, name: 'Crossbody Bag', brand: 'Brand 2' }
	];

	const searchResults = $derived(
		productSearch.length > 0
			? allProducts.filter(
					(p) =>
						p.name.toLowerCase().includes(productSearch.toLowerCase()) &&
						!taggedProducts.some((tp) => tp.id === p.id)
				)
			: []
	);

	function openCreatePost() {
		showCreatePost = true;
		createStep = 1;
		postImages = [];
		postDescription = '';
		postTags = '';
		taggedProducts = [];
		productSearch = '';
	}

	function closeCreatePost() {
		showCreatePost = false;
	}

	function addImage() {
		postImages = [...postImages, postImages.length + 1];
	}

	function addProduct(product: { id: number; name: string; brand: string }) {
		taggedProducts = [...taggedProducts, product];
		productSearch = '';
	}

	function removeProduct(id: number) {
		taggedProducts = taggedProducts.filter((p) => p.id !== id);
	}

	function submitPost(draft: boolean) {
		closeCreatePost();
	}
</script>

<svelte:head>
	<title>@{slug} — Antipop</title>
</svelte:head>

<div class="profile-page">
	<section class="profile-info">
		<div class="profile-info-inner">
			<div class="profile-avatar avatar--round">
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
			<div class="profile-details">
				<h1>@{slug}</h1>
				<p class="profile-description">
					Placeholder bio for this influencer. Fashion enthusiast, always on the lookout for
					independent brands.
				</p>
				<div class="stats">
					<span><strong>{posts.length}</strong> posts</span>
					<span><strong>{followers}</strong> followers</span>
					<span>{campaigns.length} campaigns</span>
				</div>
				<button
					class="follow-btn"
					class:following
					onclick={() => (following = !following)}
				>
					{following ? 'Following' : 'Follow'}
				</button>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Posts</h2>
		<div class="grid-3">
			<button class="post-card add-post" onclick={openCreatePost}>
				<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
					<rect width="300" height="300" fill="#f8f8f8" />
					<line x1="150" y1="100" x2="150" y2="200" stroke="#ccc" stroke-width="2" />
					<line x1="100" y1="150" x2="200" y2="150" stroke="#ccc" stroke-width="2" />
				</svg>
			</button>
			{#each posts as post}
				<a href="/@{slug}/p/{post.id}" class="post-card">
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
					<span class="post-likes">{post.likes} &#9829;</span>
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

{#if showCreatePost}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-overlay" onclick={closeCreatePost} onkeydown={() => {}}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal-card" onclick={(e) => e.stopPropagation()} onkeydown={() => {}}>
			<div class="modal-header">
				<button class="modal-close" onclick={closeCreatePost}>&times;</button>
				<span class="modal-title">
					{createStep === 1 ? 'Add photos' : 'Post details'}
				</span>
				{#if createStep === 1}
					<button
						class="modal-next"
						disabled={postImages.length === 0}
						onclick={() => (createStep = 2)}
					>
						Next &rarr;
					</button>
				{:else}
					<span></span>
				{/if}
			</div>

			{#if createStep === 1}
				<div class="modal-body">
					<button class="upload-area" onclick={addImage}>
						<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
							<rect width="400" height="300" fill="#f8f8f8" />
							<line x1="200" y1="120" x2="200" y2="200" stroke="#ccc" stroke-width="2" />
							<line x1="160" y1="160" x2="240" y2="160" stroke="#ccc" stroke-width="2" />
							<text
								x="200"
								y="240"
								text-anchor="middle"
								font-family="monospace"
								font-size="12"
								fill="#999">Click to add photos</text
							>
						</svg>
					</button>

					{#if postImages.length > 0}
						<div class="image-gallery">
							{#each postImages as img, i}
								<div class="gallery-thumb">
									<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
										<rect width="100" height="100" fill="#eee" />
										<text
											x="50"
											y="55"
											text-anchor="middle"
											font-family="monospace"
											font-size="10"
											fill="#bbb">{i + 1}</text
										>
									</svg>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<div class="modal-body">
					<div class="image-slider">
						{#each postImages as img, i}
							<div class="slider-image">
								<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
									<rect width="300" height="300" fill="#eee" />
									<text
										x="150"
										y="150"
										text-anchor="middle"
										font-family="monospace"
										font-size="14"
										fill="#bbb">Photo {i + 1}</text
									>
								</svg>
							</div>
						{/each}
					</div>

					<label class="modal-label">
						Description
						<textarea rows="3" bind:value={postDescription} placeholder="Write a caption..."></textarea>
					</label>

					<label class="modal-label">
						Tags
						<input type="text" bind:value={postTags} placeholder="e.g. streetwear, summer, ootd" />
					</label>

					<div class="products-section">
						<span class="products-title">Related products</span>
						<div class="product-search-wrap">
							<input
								type="text"
								bind:value={productSearch}
								placeholder="Search products..."
							/>
							{#if searchResults.length > 0}
								<div class="search-results">
									{#each searchResults as product}
										<button class="search-result" onclick={() => addProduct(product)}>
											<span class="result-name">{product.name}</span>
											<span class="result-brand">{product.brand}</span>
										</button>
									{/each}
								</div>
							{/if}
						</div>

						{#if taggedProducts.length > 0}
							<div class="tagged-list">
								{#each taggedProducts as product}
									<div class="tagged-chip">
										<span>{product.name}</span>
										<button class="chip-remove" onclick={() => removeProduct(product.id)}>
											&times;
										</button>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<div class="modal-actions">
						<button class="btn-secondary" onclick={() => submitPost(true)}>Save as draft</button>
						<button onclick={() => submitPost(false)}>Submit for approval</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.profile-page {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.avatar--round {
		border-radius: 50%;
		overflow: hidden;
	}

	.stats {
		display: flex;
		gap: 1.5rem;
		font-size: 0.8rem;
		color: #999;
	}

	.follow-btn {
		margin-top: 0.5rem;
		padding: 0.4rem 1.5rem;
		font-size: 0.8rem;
		width: fit-content;
	}

	.follow-btn.following {
		background: #fff;
		color: #000;
	}

	.post-card {
		border: var(--border);
		display: block;
		overflow: hidden;
	}

	.add-post {
		cursor: pointer;
		padding: 0;
		background: none;
	}

	.add-post:hover svg rect {
		fill: #f0f0f0;
	}

	.post-card {
		position: relative;
	}

	.post-card svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.post-likes {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-size: 0.75rem;
		color: #999;
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

	/* Create post modal */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-card {
		background: #fff;
		border: var(--border);
		max-width: 640px;
		width: 90vw;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		border-bottom: var(--border);
	}

	.modal-title {
		font-size: 0.85rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0 0.25rem;
		color: #666;
		text-transform: none;
	}

	.modal-next {
		font-size: 0.75rem;
		padding: 0.3rem 0.75rem;
	}

	.modal-body {
		padding: 1rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Step 1 */
	.upload-area {
		background: none;
		border: 2px dashed #ccc;
		cursor: pointer;
		padding: 0;
		text-transform: none;
	}

	.upload-area:hover {
		border-color: #999;
	}

	.upload-area svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.image-gallery {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
	}

	.gallery-thumb {
		border: var(--border);
		overflow: hidden;
	}

	.gallery-thumb svg {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Step 2 */
	.image-slider {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
	}

	.slider-image {
		flex-shrink: 0;
		width: 160px;
		border: var(--border);
	}

	.slider-image svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.modal-label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}

	.modal-label textarea {
		border: var(--border);
		padding: 0.5rem;
		font-family: monospace;
		font-size: 0.9rem;
		resize: vertical;
	}

	.products-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.products-title {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}

	.product-search-wrap {
		position: relative;
	}

	.search-results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: #fff;
		border: var(--border);
		border-top: none;
		z-index: 10;
	}

	.search-result {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem;
		background: none;
		border: none;
		border-bottom: var(--border);
		cursor: pointer;
		text-transform: none;
		color: #333;
		font-size: 0.85rem;
	}

	.search-result:hover {
		background: #f8f8f8;
	}

	.result-brand {
		color: #999;
		font-size: 0.75rem;
	}

	.tagged-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tagged-chip {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		border: var(--border);
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
	}

	.chip-remove {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-size: 1rem;
		color: #999;
		text-transform: none;
	}

	.chip-remove:hover {
		color: #c00;
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		padding-top: 0.5rem;
		border-top: var(--border);
	}

	.btn-secondary {
		background: #fff;
		color: #333;
	}
</style>
