<script lang="ts">
	import { login } from '$lib';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	let username = '';
	let password = '';
	let loading = false;
	let error = '';

	async function submit() {
		loading = true;
		try {
			await login(username, password);
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	$: if (username.length || password.length) {
		error = '';
	}
</script>

<div class="card p-4 m-4 flex flex-col gap-2">
	<form class="flex flex-col gap-4" on:submit|preventDefault>
		<label class="label">
			<span>Username or Email</span>
			<input bind:value={username} disabled={loading} class="input" type="text" />
		</label>

		<label class="label">
			<span>Password</span>
			<input bind:value={password} disabled={loading} class="input" type="password" />
		</label>

		<span color="danger">{error}</span>

		<button
			disabled={loading}
			on:keydown={submit}
			on:click={submit}
			type="submit"
			class="btn variant-filled-primary w-full"
		>
			Log in
			{#if loading}
				<ProgressRadial />
			{/if}
		</button>
	</form>
</div>
