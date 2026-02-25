<script lang="ts">
	import { page } from '$app/state';
	import Modal from '$lib/client/Modal.svelte';

	let { children } = $props();

	let showLogout = $state(false);

	const path = $derived(page.url.pathname);
</script>

<div class="page">
	<h1>Dashboard</h1>

	<div class="layout">
		<nav class="sidebar">
			<div class="sidebar-section">
				<a class="sidebar-item" class:active={path === '/dashboard/orders'} href="/dashboard/orders">
					<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1.5A.5.5 0 0 1 2.5 1h11a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13zM3 2v12h10V2H3zm2 1h6v1H5V3zm0 2.5h6v1H5v-1zM5 8h6v1H5V8z"/></svg>
					Orders
				</a>
				<a class="sidebar-item" class:active={path === '/dashboard/returns'} href="/dashboard/returns">
					<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 2.5A.5.5 0 0 1 2.5 2h3a.5.5 0 0 1 0 1H3v10h10V3h-2.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11z"/><path d="M8 1a.5.5 0 0 1 .354.146l2 2a.5.5 0 1 1-.708.708L8.5 2.707V8.5a.5.5 0 0 1-1 0V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2A.5.5 0 0 1 8 1z"/></svg>
					Returns
				</a>
				<a class="sidebar-item" class:active={path === '/dashboard/favourites'} href="/dashboard/favourites">
					<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"/></svg>
					Favourites
				</a>
			</div>
			<div class="sidebar-footer">
				<a class="sidebar-link" class:active={path === '/dashboard/account'} href="/dashboard/account">Account</a>
				<button class="sidebar-link" onclick={() => (showLogout = true)}>Logout</button>
			</div>
		</nav>

		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<Modal bind:open={showLogout}>
	{#snippet title()}<h2>Logout</h2>{/snippet}
	{#snippet content()}<p class="muted">Are you sure you want to log out?</p>{/snippet}
	{#snippet actions()}
		<button class="btn-cancel" onclick={() => (showLogout = false)}>Cancel</button>
		<button onclick={() => (showLogout = false)}>Logout</button>
	{/snippet}
</Modal>

<style>
	.layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 2rem;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		border: var(--border);
		background: #fff;
		align-self: flex-start;
		justify-content: space-between;
	}

	.sidebar-section {
		display: flex;
		flex-direction: column;
	}

	.sidebar-item {
		text-align: left;
		border-bottom: var(--border);
		background: none;
		color: #333;
		padding: 0.65rem 1rem;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sidebar-item svg {
		flex-shrink: 0;
	}

	.sidebar-item:hover {
		background: #f5f5f5;
		text-decoration: none;
	}

	.sidebar-item.active {
		background: #333;
		color: #fff;
	}

	.sidebar-footer {
		border-top: var(--border);
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.70rem;
		padding: 0.65rem 1rem;
	}

	.sidebar-link {
		display: inline;
		background: none;
		border: none;
		color: #999;
		font-size: 0.75rem;
		padding: 0;
		text-transform: none;
		letter-spacing: normal;
		cursor: pointer;
	}

	.sidebar-link:hover {
		color: #333;
		text-decoration: underline;
	}

	.sidebar-link.active {
		color: #333;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.muted {
		color: #666;
		font-size: 0.85rem;
	}

	.btn-cancel {
		background: #fff;
		color: #333;
	}
</style>
