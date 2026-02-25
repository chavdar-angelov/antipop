<svelte:head>
	<title>Campaigns — Antipop</title>
</svelte:head>

<div class="page-header">
	<h2>Campaigns</h2>
	<button>Create campaign</button>
</div>
<div class="list">
	{#each [
		{ id: 'CMP-001', name: 'Summer Streetwear Drop', discount: '20%', affiliates: 12, status: 'Active' },
		{ id: 'CMP-002', name: 'Back to School', discount: '15%', affiliates: 5, status: 'Draft' },
		{ id: 'CMP-003', name: 'Holiday Collection', discount: '25%', affiliates: 28, status: 'Ended' }
	] as campaign}
		<div class="list-row">
			<span class="list-id">{campaign.id}</span>
			<span class="list-name">{campaign.name}</span>
			<span class="list-discount">{campaign.discount}</span>
			<span class="list-affiliates">{campaign.affiliates} affiliates</span>
			<span class="list-status">{campaign.status}</span>
			<a href="/dashboard/campaigns/{campaign.id}" class="list-link">Edit</a>
		</div>
	{/each}
</div>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-header button {
		font-size: 0.8rem;
		padding: 0.4rem 1rem;
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

	.list-affiliates {
		width: 90px;
		font-size: 0.8rem;
		color: #888;
	}
</style>
