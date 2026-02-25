<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { cart } from '$lib/client/cart.svelte';

	let { data, children } = $props();

	function onRoleChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		if (value === 'public') {
			document.cookie = 'debug-role=; path=/; max-age=0';
		} else {
			document.cookie = `debug-role=${value}; path=/`;
		}
		location.reload();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.debug}
	<div class="debug-bar">
		<div class="debug-inner">
			<span class="debug-title">Debug bar</span>
			<label class="debug-label">
				Login as
				<select class="debug-select" value={data.role} onchange={onRoleChange}>
					<option value="public">Public</option>
					<option value="customer">Customer</option>
					<option value="brand">Brand</option>
					<option value="influencer">Influencer</option>
					<option value="admin">Super Admin</option>
				</select>
			</label>
		</div>
	</div>
{/if}

<header>
	<div class="header-inner">
		<a href="/" class="logo">ANTIPOP</a>

		<nav>
			<a href="/c/men">Men</a>
			<a href="/c/women">Women</a>
			<a href="/c/kids">Kids</a>
			<a href="/campaigns">Campaigns</a>
		</nav>

		<div class="auth">
			<a href="/cart">Cart{#if cart.length > 0} ({cart.length}){/if}</a>
			<a href="/dashboard">Dashboard</a>
			<a href="/sign-in">Sign in</a>
			<a href="/sign-up" class="sign-up">Sign up</a>
		</div>
	</div>
</header>

<main>
	{@render children()}
</main>

<footer>
	<div class="footer-inner">
		<div class="footer-col">
			<strong>ANTIPOP</strong>
			<p>Independent clothing marketplace</p>
		</div>
		<div class="footer-col">
			<strong>Shop</strong>
			<a href="/c/men">Men</a>
			<a href="/c/women">Women</a>
			<a href="/c/kids">Kids</a>
		</div>
		<div class="footer-col">
			<strong>Company</strong>
			<a href="/about">About</a>
			<a href="/contact">Contact</a>
		</div>
	</div>
</footer>

<style>
	.debug-bar {
		background: #333;
		color: #fff;
	}

	.debug-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 0.4rem var(--gap);
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 0.75rem;
	}

	.debug-title {
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.debug-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #ccc;
		font-size: 0.75rem;
		text-transform: none;
	}

	.debug-select {
		font-family: monospace;
		font-size: 0.75rem;
		padding: 0.15rem 0.35rem;
		border: 1px solid #666;
		background: #444;
		color: #fff;
	}

	header {
		border-bottom: var(--border);
		background: #fff;
	}

	.header-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 1rem var(--gap);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: bold;
		letter-spacing: 0.15em;
	}

	nav {
		display: flex;
		gap: 1.5rem;
	}

	.auth {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.sign-up {
		border: var(--border);
		padding: 0.35rem 0.75rem;
	}

	main {
		min-height: 80vh;
	}

	footer {
		border-top: var(--border);
		background: #fff;
		margin-top: 3rem;
	}

	.footer-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2rem var(--gap);
		display: flex;
		gap: 4rem;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
