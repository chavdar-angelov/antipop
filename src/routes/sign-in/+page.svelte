<script lang="ts">
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		loading = true;

		// TODO: implement SIGN_IN command
		try {
			const res = await fetch('/command', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					command: 'SIGN_IN',
					payload: { email, password }
				})
			});
			const data = await res.json();

			if (!data.ok) {
				error = data.error || 'Invalid credentials';
			}
		} catch {
			error = 'Network error';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign in — Antipop</title>
</svelte:head>

<div class="page page--centered">
	<div class="form-card">
		<h1>Sign in</h1>

		<form onsubmit={handleSubmit}>
			<label>
				Email
				<input type="email" bind:value={email} required autocomplete="email" />
			</label>

			<label>
				Password
				<input type="password" bind:value={password} required autocomplete="current-password" />
			</label>

			{#if error}
				<p class="error">{error}</p>
			{/if}

			<button type="submit" disabled={loading}>
				{loading ? 'Signing in...' : 'Sign in'}
			</button>
		</form>

		<p class="alt">Don't have an account? <a href="/sign-up">Sign up</a></p>
	</div>
</div>

