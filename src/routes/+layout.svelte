<script lang="ts">
	import { setupIonicBase, setupIonicSvelte } from 'ionic-svelte';

	/* run base configuration code from ionic/core */
	setupIonicBase();

	/* load and register all components - you can also import separately to code split */
	// import 'ionic-svelte/components/all';
	import 'ionic-svelte/components/ion-app';
	import 'ionic-svelte/components/ion-card';
	import 'ionic-svelte/components/ion-card-title';
	import 'ionic-svelte/components/ion-card-subtitle';
	import 'ionic-svelte/components/ion-card-header';
	import 'ionic-svelte/components/ion-card-content';
	import 'ionic-svelte/components/ion-chip';
	import 'ionic-svelte/components/ion-button';

	/* Theme variables */
	import '../theme/variables.css';
</script>

<ion-app>
	<slot />
</ion-app>
