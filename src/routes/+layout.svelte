<script lang="ts">
	import { setupIonicBase } from 'ionic-svelte';

	/* run base configuration code from ionic/core */
	setupIonicBase();

	/* load and register all components - you can also import separately to code split */
	import 'ionic-svelte/components/all';
	// import 'ionic-svelte/components/ion-app';
	// import 'ionic-svelte/components/ion-card';
	// import 'ionic-svelte/components/ion-card-title';
	// import 'ionic-svelte/components/ion-card-subtitle';
	// import 'ionic-svelte/components/ion-card-header';
	// import 'ionic-svelte/components/ion-card-content';
	// import 'ionic-svelte/components/ion-chip';
	// import 'ionic-svelte/components/ion-button';

	/* Theme variables */
	import '../theme/variables.css';

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

<style global>
	ion-tab {
		/* This padding is for the ion-toolbar. */
		padding-top: 56px;
	}

	.tab-padding-top {
		/* This padding is for the ion-toolbar. */
		/* padding-top: 56px; */
		padding-top: 56px;
	}
</style>
