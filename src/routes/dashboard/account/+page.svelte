<svelte:head>
	<title>Account — Antipop</title>
</svelte:head>

<h2>Personal details</h2>
<form onsubmit={(e) => e.preventDefault()}>
	<div class="row">
		<label>
			First name
			<input type="text" value="Jane" />
		</label>
		<label>
			Last name
			<input type="text" value="Doe" />
		</label>
	</div>

	<label>
		Email
		<input type="email" value="jane@example.com" />
	</label>

	<label>
		Phone
		<input type="tel" value="+359 888 123 456" />
	</label>

	<h2>Shipping address</h2>

	<label>
		Street address
		<input type="text" value="123 Main St" />
	</label>

	<div class="row">
		<label>
			City
			<input type="text" value="Sofia" />
		</label>
		<label>
			Postal code
			<input type="text" value="1000" />
		</label>
	</div>

	<label>
		Country
		<input type="text" value="Bulgaria" />
	</label>

	<button type="submit">Save changes</button>
</form>

<div class="delete-section">
	<h2>Delete profile</h2>
	<p class="danger-text">
		This will permanently delete your account and all associated data. This action cannot be
		undone.
	</p>
	<button class="danger-btn" onclick={() => {}}>Delete my account</button>
</div>

<style>
	form {
		max-width: 480px;
	}

	.delete-section {
		border-top: var(--border);
		padding-top: 1.5rem;
		margin-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

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
