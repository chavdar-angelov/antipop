<svelte:head>
	<title>Settings — Antipop</title>
</svelte:head>

<h2>Brand profile</h2>
<div class="profile-row">
	<div class="logo-upload">
		<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
			<rect width="120" height="120" fill="#eee" />
			<text
				x="60"
				y="55"
				text-anchor="middle"
				font-family="monospace"
				font-size="10"
				fill="#bbb">LOGO</text
			>
			<text
				x="60"
				y="75"
				text-anchor="middle"
				font-family="monospace"
				font-size="8"
				fill="#ccc">Click to upload</text
			>
		</svg>
	</div>
	<form onsubmit={(e) => e.preventDefault()}>
		<label>
			Brand name
			<input type="text" value="Acme Apparel" />
		</label>
		<label>
			Brand URL
			<span class="url-prefix">antipop.bg/~</span>
			<input type="text" value="acme-apparel" />
		</label>
		<label>
			Tagline
			<input type="text" value="Independent streetwear since 2020" />
		</label>
		<label>
			Description
			<textarea rows="4">We create bold, sustainable streetwear for the modern individual.</textarea>
		</label>
		<label>
			Website
			<input type="url" value="https://acme-apparel.com" />
		</label>
		<button type="submit">Save changes</button>
	</form>
</div>

<h2>Store settings</h2>
<form onsubmit={(e) => e.preventDefault()}>
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

<div class="delete-section">
	<h2>Delete brand profile</h2>
	<p class="danger-text">
		This will permanently delete your brand profile, all products, campaigns and associated data.
		This action cannot be undone.
	</p>
	<button class="danger-btn" onclick={() => {}}>Delete brand profile</button>
</div>

<style>
	.profile-row {
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.logo-upload {
		width: 120px;
		flex-shrink: 0;
		border: var(--border);
		cursor: pointer;
	}

	.logo-upload svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.profile-row form {
		max-width: 480px;
		flex: 1;
	}

	form {
		max-width: 480px;
	}

	.url-prefix {
		font-size: 0.8rem;
		color: #999;
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
