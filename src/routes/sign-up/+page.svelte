<script lang="ts">
	let email = $state('');
	let password = $state('');
	let confirm = $state('');
	let error = $state('');
	let success = $state(false);
	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';

		if (password !== confirm) {
			error = 'Passwords do not match';
			return;
		}

		loading = true;
		try {
			const res = await fetch('/command', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					command: 'CREATE_USER',
					payload: { email, password }
				})
			});
			const data = await res.json();

			if (!data.ok) {
				error = data.error || 'Something went wrong';
			} else {
				success = true;
			}
		} catch {
			error = 'Network error';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign up — Antipop</title>
</svelte:head>

<div class="page">
	<div class="form-card">
		<h1>Sign up</h1>

		{#if success}
			<p class="success">Account created. <a href="/sign-in">Sign in</a></p>
		{:else}
			<form onsubmit={handleSubmit}>
				<label>
					Email
					<input type="email" bind:value={email} required autocomplete="email" />
				</label>

				<label>
					Password
					<input type="password" bind:value={password} required autocomplete="new-password" />
				</label>

				<label>
					Confirm password
					<input type="password" bind:value={confirm} required autocomplete="new-password" />
				</label>

				{#if error}
					<p class="error">{error}</p>
				{/if}

				<button type="submit" disabled={loading}>
					{loading ? 'Creating...' : 'Create account'}
				</button>
			</form>

			<p class="alt">Already have an account? <a href="/sign-in">Sign in</a></p>
		{/if}
	</div>
</div>

<style>
	.page {
		display: flex;
		justify-content: center;
		padding: 3rem var(--gap);
	}

	.form-card {
		width: 100%;
		max-width: 360px;
		border: var(--border);
		padding: 2rem;
		background: #fff;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	h1 {
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}

	input {
		border: var(--border);
		padding: 0.5rem;
		font-family: monospace;
		font-size: 0.9rem;
		background: #fff;
	}

	button {
		border: var(--border);
		padding: 0.6rem;
		background: #333;
		color: #fff;
		font-family: monospace;
		font-size: 0.9rem;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.error {
		color: #c00;
		font-size: 0.85rem;
	}

	.success {
		font-size: 0.9rem;
	}

	.alt {
		font-size: 0.85rem;
		color: #666;
		text-align: center;
	}
</style>
