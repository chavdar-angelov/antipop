<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		content,
		actions,
		open = $bindable(false)
	}: {
		title: Snippet;
		content: Snippet;
		actions: Snippet;
		open: boolean;
	} = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		if (open) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}
	});
</script>

<dialog bind:this={dialog} onclose={() => (open = false)}>
	<div class="modal-title">
		{@render title()}
	</div>
	<div class="modal-content">
		{@render content()}
	</div>
	<div class="modal-actions">
		{@render actions()}
	</div>
</dialog>

<style>
	dialog {
		border: var(--border);
		padding: 2rem;
		font-family: monospace;
		max-width: 420px;
		width: fit-content;
		height: fit-content;
		position: fixed;
		inset: 0;
		margin: auto;
	}

	dialog[open] {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	.modal-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: flex-end;
	}
</style>
