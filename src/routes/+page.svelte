<script>
	import Auth from '$components/Auth.svelte';
	import { currentUser } from '$services';
</script>

<!-- <ion-tab tab="">
	<ion-card>
		<ion-item>
			<ion-label>About</ion-label>
			<a href="about" >View</a>
		</ion-item>

		<ion-item>
			<ion-label>Settings</ion-label>
			<a href="settings">View</a>
		</ion-item>
	</ion-card>
</ion-tab> -->

{#if $currentUser == null}
	<Auth />
{:else}
	<a href="about">About</a>
	<a href="settings">Settings</a>
{/if}
