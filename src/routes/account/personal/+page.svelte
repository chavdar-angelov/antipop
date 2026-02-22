<svelte:head>
	<title>Personal details — Antipop</title>
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

<style>
	form {
		max-width: 480px;
	}
</style>
