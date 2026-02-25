<svelte:head>
	<title>Affiliates — Antipop</title>
</svelte:head>

<h2>Affiliates</h2>
<div class="list">
	{#each [
		{ name: '@fashionista', posts: 8, sales: 24, earned: '€180.00', status: 'Active' },
		{ name: '@streetstyle_bg', posts: 3, sales: 12, earned: '€96.00', status: 'Active' },
		{ name: '@minimalist.jane', posts: 5, sales: 7, earned: '€52.50', status: 'Pending' }
	] as affiliate}
		<div class="list-row">
			<span class="list-name">{affiliate.name}</span>
			<span class="list-posts">{affiliate.posts} posts</span>
			<span class="list-sales">{affiliate.sales} sales</span>
			<span class="list-price">{affiliate.earned}</span>
			<span class="list-status">{affiliate.status}</span>
		</div>
	{/each}
</div>

<style>
	.list-name {
		flex: 1;
		font-size: 0.85rem;
		font-weight: bold;
	}

	.list-posts,
	.list-sales {
		width: 70px;
		font-size: 0.8rem;
		color: #888;
	}
</style>
