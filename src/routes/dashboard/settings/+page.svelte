<svelte:head>
	<title>Settings — Antipop</title>
</svelte:head>

<h2>Settings</h2>
<form onsubmit={(e) => e.preventDefault()}>
	<label>
		Store URL slug
		<input type="text" value="acme-apparel" />
	</label>

	<label>
		Contact email
		<input type="email" value="contact@acme-apparel.com" />
	</label>

	<label>
		Return policy
		<textarea rows="3">Returns accepted within 14 days of delivery. Items must be unworn with tags attached.</textarea>
	</label>

	<h2>Payout</h2>

	<label>
		Bank account (IBAN)
		<input type="text" value="BG80BNBG9661..." />
	</label>

	<label>
		VAT number
		<input type="text" value="BG123456789" />
	</label>

	<button type="submit">Save settings</button>
</form>

<style>
	form {
		max-width: 480px;
	}

	textarea {
		border: var(--border);
		padding: 0.5rem;
		font-family: monospace;
		font-size: 0.9rem;
		background: #fff;
		resize: vertical;
		width: 100%;
	}
</style>
