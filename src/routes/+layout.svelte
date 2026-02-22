<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { cart } from '$lib/client/cart.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="header-inner">
		<a href="/" class="logo">ANTIPOP</a>

		<nav>
			<a href="/c/men">Men</a>
			<a href="/c/women">Women</a>
			<a href="/c/accessories">Accessories</a>
		</nav>

		<div class="auth">
			<a href="/cart">Cart{#if cart.length > 0} ({cart.length}){/if}</a>
			<a href="/account">Account</a>
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
			<a href="/c/accessories">Accessories</a>
		</div>
		<div class="footer-col">
			<strong>Company</strong>
			<a href="/about">About</a>
			<a href="/contact">Contact</a>
		</div>
	</div>
</footer>

<style>
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
