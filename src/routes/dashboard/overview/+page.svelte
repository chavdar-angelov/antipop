<svelte:head>
	<title>Overview — Antipop</title>
</svelte:head>

<h2>Overview</h2>
<div class="stats-grid">
	<div class="stat-card">
		<span class="stat-value">€2,340</span>
		<span class="stat-label">Revenue this month</span>
	</div>
	<div class="stat-card">
		<span class="stat-value">47</span>
		<span class="stat-label">Orders this month</span>
	</div>
	<div class="stat-card">
		<span class="stat-value">12</span>
		<span class="stat-label">Products listed</span>
	</div>
	<div class="stat-card">
		<span class="stat-value">3</span>
		<span class="stat-label">Active campaigns</span>
	</div>
</div>

<h2>Recent orders</h2>
<div class="list">
	{#each [
		{ id: 'BRD-004', date: '2026-02-20', customer: 'Jane D.', status: 'Processing', total: '€89.98' },
		{ id: 'BRD-003', date: '2026-02-18', customer: 'Alex M.', status: 'Shipped', total: '€59.99' },
		{ id: 'BRD-002', date: '2026-02-15', customer: 'Sam K.', status: 'Delivered', total: '€179.97' }
	] as order}
		<div class="list-row">
			<span class="list-id">{order.id}</span>
			<span class="list-date">{order.date}</span>
			<span class="list-customer">{order.customer}</span>
			<span class="list-status">{order.status}</span>
			<span class="list-price">{order.total}</span>
		</div>
	{/each}
</div>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
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

	.list-customer {
		flex: 1;
		font-size: 0.85rem;
	}
</style>
