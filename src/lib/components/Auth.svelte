<script lang="ts">
	import { login } from '$lib';
	import Input from './Input.svelte';
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

<ion-card>
	<!-- <ion-card-header>
    <ion-card-title>Log in</ion-card-title>
  </ion-card-header> -->

	<ion-card-content>
		<form on:submit|preventDefault>
			<Input
				label="Username or Email"
				labelPlacement="floating"
				bind:value={username}
				type="text"
			/>
			<Input label="Password" labelPlacement="floating" bind:value={password} type="password" />
			<br />

			<ion-text color="danger">{error}</ion-text>

			<ion-button
				disabled={loading}
				on:keydown={submit}
				on:click={submit}
				type="submit"
				expand="block"
			>
				Log in
				{#if loading}
					<ion-spinner name="crescent" />
				{/if}
			</ion-button>
		</form>

		<!-- <ion-button on:click={() => loginWithProvider('google')}>Log in with Google</ion-button> -->
	</ion-card-content>
</ion-card>

<style>
	ion-card {
		margin: auto;
		margin-left: 8px;
		margin-right: 8px;
	}
</style>
