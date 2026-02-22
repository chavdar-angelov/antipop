<script lang="ts">
	import { page } from '$app/state';
	import Modal from '$lib/client/Modal.svelte';

	let { children } = $props();

	let showLogout = $state(false);

	const path = $derived(page.url.pathname);
</script>

<div class="page">
	<h1>Account</h1>

	<div class="layout">
		<nav class="sidebar">
			<a class="sidebar-item" class:active={path === '/account/personal'} href="/account/personal">Personal details</a>
			<a class="sidebar-item" class:active={path === '/account/orders'} href="/account/orders">Orders</a>
			<a class="sidebar-item" class:active={path === '/account/returns'} href="/account/returns">Returns</a>
			<a class="sidebar-item" class:active={path === '/account/favourites'} href="/account/favourites">Favourites</a>
			<a class="sidebar-item" class:active={path === '/account/delete'} href="/account/delete">Delete profile</a>
			<button class="sidebar-item" onclick={() => (showLogout = true)}>Logout</button>
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
	}

	.sidebar-item {
		text-align: left;
		border-bottom: var(--border);
		background: none;
		color: #333;
		padding: 0.65rem 1rem;
		font-size: 0.8rem;
	}

	.sidebar-item:last-child {
		border-bottom: none;
	}

	.sidebar-item:hover {
		background: #f5f5f5;
		text-decoration: none;
	}

	.sidebar-item.active {
		background: #333;
		color: #fff;
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
