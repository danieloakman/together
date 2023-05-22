<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { currentUser } from '$services';
	import Auth from '$components/Auth.svelte';
	import NavMenu from '$components/NavMenu.svelte';

</script>

<ion-app>
	{#if $currentUser}
		<NavMenu><slot/></NavMenu>
	{:else}
		<Auth />
	{/if}
</ion-app>

<!-- <style global>
	ion-tab {
		/* This padding is for the ion-toolbar. */
		padding-top: 56px;
	}

	.tab-padding-top {
		/* This padding is for the ion-toolbar. */
		/* padding-top: 56px; */
		padding-top: 56px;
	}
</style> -->
