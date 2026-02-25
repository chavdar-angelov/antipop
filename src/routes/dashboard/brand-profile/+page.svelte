<svelte:head>
	<title>Brand profile — Antipop</title>
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

	form {
		max-width: 480px;
		flex: 1;
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
</style>
