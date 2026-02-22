<svelte:head>
	<title>Delete profile — Antipop</title>
</svelte:head>

<h2>Delete profile</h2>
<p class="danger-text">
	This will permanently delete your account and all associated data. This action cannot be undone.
</p>
<button class="danger-btn" onclick={() => {}}>Delete my account</button>

<style>
	.danger-text {
		color: #666;
		font-size: 0.85rem;
		line-height: 1.5;
		max-width: 480px;
	}

	.danger-btn {
		background: #c00;
		border-color: #c00;
		max-width: 200px;
	}
</style>
