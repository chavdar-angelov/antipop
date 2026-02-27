<svelte:head>
	<title>Affiliate — Antipop</title>
</svelte:head>

<h2>Affiliate</h2>

<div class="stats-row">
	<div class="stat-card">
		<span class="stat-value">€328.50</span>
		<span class="stat-label">Total earned</span>
	</div>
	<div class="stat-card">
		<span class="stat-value">41</span>
		<span class="stat-label">Total sales</span>
	</div>
	<div class="stat-card">
		<span class="stat-value">3</span>
		<span class="stat-label">Active campaigns</span>
	</div>
</div>

<h2>My campaigns</h2>
<div class="list">
	{#each [
		{ brand: 'Urban Edge', campaign: 'Summer Streetwear Drop', discount: '20%', sales: 18, earned: '€144.00' },
		{ brand: 'Plain Studio', campaign: 'Minimalist Essentials', discount: '25%', sales: 15, earned: '€112.50' },
		{ brand: 'Green Label', campaign: 'Eco-Friendly Basics', discount: '30%', sales: 8, earned: '€72.00' }
	] as item}
		<div class="list-row">
			<span class="list-brand">{item.brand}</span>
			<span class="list-name">{item.campaign}</span>
			<span class="list-discount">{item.discount}</span>
			<span class="list-sales">{item.sales} sales</span>
			<span class="list-price">{item.earned}</span>
		</div>
	{/each}
</div>

<style>
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
	}

	.stat-card {
		border: var(--border);
		background: #fff;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.stat-label {
		font-size: 0.75rem;
		color: #999;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.list-brand {
		width: 100px;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #999;
	}

	.list-name {
		flex: 1;
		font-size: 0.85rem;
	}

	.list-discount {
		width: 50px;
		font-weight: bold;
		font-size: 0.85rem;
	}

	.list-sales {
		width: 70px;
		font-size: 0.8rem;
		color: #888;
	}
</style>
