<svelte:head>
	<title>Team — Antipop</title>
</svelte:head>

<div class="page-header">
	<h2>Team</h2>
	<button>Invite member</button>
</div>
<div class="list">
	{#each [
		{ name: 'Jane Doe', email: 'jane@acme-apparel.com', role: 'Owner' },
		{ name: 'Alex Morgan', email: 'alex@acme-apparel.com', role: 'Moderator' },
		{ name: 'Sam Kim', email: 'sam@acme-apparel.com', role: 'Moderator' }
	] as member}
		<div class="list-row">
			<span class="list-name">{member.name}</span>
			<span class="list-email">{member.email}</span>
			<span class="list-role">{member.role}</span>
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
		font-weight: bold;
	}

	.list-email {
		flex: 1;
		font-size: 0.8rem;
		color: #888;
	}

	.list-role {
		width: 80px;
		font-size: 0.8rem;
	}
</style>
