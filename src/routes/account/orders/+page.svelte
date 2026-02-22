<svelte:head>
	<title>Orders — Antipop</title>
</svelte:head>

<h2>Orders</h2>
<div class="list">
	{#each [
		{ id: 'ORD-001', date: '2026-02-18', status: 'Delivered', total: '€79.99' },
		{ id: 'ORD-002', date: '2026-02-10', status: 'Shipped', total: '€149.00' },
		{ id: 'ORD-003', date: '2026-01-28', status: 'Delivered', total: '€34.50' }
	] as order}
		<div class="list-row">
			<span class="list-id">{order.id}</span>
			<span class="list-date">{order.date}</span>
			<span class="list-status">{order.status}</span>
			<span class="list-price">{order.total}</span>
			<a href="/account/orders/{order.id}" class="list-link">View</a>
		</div>
	{/each}
</div>
