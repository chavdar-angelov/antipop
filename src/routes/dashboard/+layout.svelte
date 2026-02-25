<script lang="ts">
	import { page } from '$app/state';
	import Modal from '$lib/client/Modal.svelte';

	let { children } = $props();

	let showLogout = $state(false);

	const path = $derived(page.url.pathname);
	const role = $derived(page.data.role);
</script>

<div class="page">
	<h1>Dashboard</h1>

	<div class="layout">
		<nav class="sidebar">
			{#if role === 'customer'}
				<div class="sidebar-section">
					<a class="sidebar-item" class:active={path === '/dashboard/purchases'} href="/dashboard/purchases">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1.5A.5.5 0 0 1 2.5 1h11a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13zM3 2v12h10V2H3zm2 1h6v1H5V3zm0 2.5h6v1H5v-1zM5 8h6v1H5V8z"/></svg>
						Purchases
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
			{:else if role === 'brand'}
				<div class="sidebar-section">
					<a class="sidebar-item" class:active={path === '/dashboard/overview'} href="/dashboard/overview">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M3 2v12h10V2H3zM2 1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm2 3h8v1H4V4zm0 2.5h8v1H4v-1zm0 2.5h5v1H4V9z"/></svg>
						Overview
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/products'} href="/dashboard/products">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4h-3.5zM2 5v9h12V5H2z"/></svg>
						Products
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/inventory'} href="/dashboard/inventory">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h11A1.5 1.5 0 0 1 15 3.5v1A1.5 1.5 0 0 1 13.5 6h-11A1.5 1.5 0 0 1 1 4.5v-1zM2.5 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-11zM2 7.5v6a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-6h-1v5H3v-5H2zm4.5 1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5z"/></svg>
						Inventory
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/orders'} href="/dashboard/orders">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1.5A.5.5 0 0 1 2.5 1h11a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13zM3 2v12h10V2H3zm2 1h6v1H5V3zm0 2.5h6v1H5v-1zM5 8h6v1H5V8z"/></svg>
						Orders
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/campaigns'} href="/dashboard/campaigns">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M13 2.5L3.5 6H1.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5H3l1.5.75L6 14.5a.5.5 0 0 0 .45.5h1.1a.5.5 0 0 0 .45-.72L6.75 11 13 13.5a.5.5 0 0 0 .72-.46V2.96A.5.5 0 0 0 13 2.5z"/></svg>
						Campaigns
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/team'} href="/dashboard/team">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm10.5 0c.28 0 .5-.22.5-.5 0-1-1-3.5-4.5-3.5h-.1C11 10.3 12 11.6 12 13c0 .4-.1.7-.3 1h-.2z"/></svg>
						Team
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/settings'} href="/dashboard/settings">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.902 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291a1.873 1.873 0 0 0-1.116-2.693l-.318-.094c-.835-.246-.835-1.428 0-1.674l.319-.094a1.873 1.873 0 0 0 1.115-2.692l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.116l.094-.318z"/></svg>
						Settings
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/affiliates'} href="/dashboard/affiliates">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M11.285 9.458l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 5.671A3 3 0 0 0 7.414 10.5l.586-.586a1.002 1.002 0 0 0 .154-.199 2 2 0 0 1-.861-3.337L9.12 4.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287z"/></svg>
						Affiliates
					</a>
				</div>
			{:else if role === 'influencer'}
				<div class="sidebar-section">
					<a class="sidebar-item" class:active={path === '/dashboard/purchases'} href="/dashboard/purchases">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 1.5A.5.5 0 0 1 2.5 1h11a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13zM3 2v12h10V2H3zm2 1h6v1H5V3zm0 2.5h6v1H5v-1zM5 8h6v1H5V8z"/></svg>
						Purchases
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/returns'} href="/dashboard/returns">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 2.5A.5.5 0 0 1 2.5 2h3a.5.5 0 0 1 0 1H3v10h10V3h-2.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11z"/><path d="M8 1a.5.5 0 0 1 .354.146l2 2a.5.5 0 1 1-.708.708L8.5 2.707V8.5a.5.5 0 0 1-1 0V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2A.5.5 0 0 1 8 1z"/></svg>
						Returns
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/favourites'} href="/dashboard/favourites">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"/></svg>
						Favourites
					</a>
					<a class="sidebar-item" class:active={path === '/dashboard/my-affiliate'} href="/dashboard/my-affiliate">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0-1a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm4.5 6c.28 0 .5-.22.5-.5C13 10.57 10.86 9 8 9s-5 1.57-5 3.5c0 .28.22.5.5.5h9zM8 10c2.34 0 4 1.21 4 2.5H4C4 11.21 5.66 10 8 10z"/><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-1 0v-1zm10 0A1.5 1.5 0 0 0 10.5 2h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 0 1 0v-1z"/></svg>
						Affiliate
					</a>
					<a class="sidebar-item" href="/@influencer">
						<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm-.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .146.354l3 3a.5.5 0 0 0 .708-.708L8 8.293V3.5a.5.5 0 0 0-.5-.5z"/></svg>
						My public profile
					</a>
				</div>
			{/if}
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
		<button onclick={() => { document.cookie = 'debug-role=; path=/; max-age=0'; window.location.href = '/'; }}>Logout</button>
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
