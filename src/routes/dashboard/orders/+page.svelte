<svelte:head>
	<title>Orders — Antipop</title>
</svelte:head>

<h2>Orders</h2>
<div class="list">
	{#each [
		{ id: 'BRD-001', date: '2026-02-20', customer: 'Jane D.', items: 2, status: 'Processing', total: '€89.98' },
		{ id: 'BRD-002', date: '2026-02-18', customer: 'Alex M.', items: 1, status: 'Shipped', total: '€59.99' },
		{ id: 'BRD-003', date: '2026-02-15', customer: 'Sam K.', items: 3, status: 'Delivered', total: '€179.97' },
		{ id: 'BRD-004', date: '2026-02-12', customer: 'Chris P.', items: 1, status: 'Delivered', total: '€29.99' }
	] as order}
		<div class="list-row">
			<span class="list-id">{order.id}</span>
			<span class="list-date">{order.date}</span>
			<span class="list-customer">{order.customer}</span>
			<span class="list-items">{order.items} items</span>
			<span class="list-status">{order.status}</span>
			<span class="list-price">{order.total}</span>
			<a href="/dashboard/orders/{order.id}" class="list-link">View</a>
		</div>
	{/each}
</div>

<style>
	.list-customer {
		flex: 1;
		font-size: 0.85rem;
	}

	.list-items {
		width: 60px;
		font-size: 0.8rem;
		color: #888;
	}
</style>
