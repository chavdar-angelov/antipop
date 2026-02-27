<svelte:head>
	<title>Returns — Antipop</title>
</svelte:head>

<h2>Returns</h2>
<div class="list">
	{#each [
		{ id: 'RET-001', date: '2026-02-15', status: 'Pending', total: '€79.99' }
	] as ret}
		<div class="list-row">
			<span class="list-id">{ret.id}</span>
			<span class="list-date">{ret.date}</span>
			<span class="list-status">{ret.status}</span>
			<span class="list-price">{ret.total}</span>
			<a href="/dashboard/returns/{ret.id}" class="list-link">View</a>
		</div>
	{/each}
</div>
