<script lang="ts">
	import { setupIonicBase } from 'ionic-svelte';
	import IonTabs from 'ionic-svelte/components/IonTabs.svelte';

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

	import { calendar, information, location, list, receipt } from 'ionicons/icons';
	import { onMount } from 'svelte';

	interface Tab {
		label: string;
		icon: string;
		tab: string;
	}

	const TABS: Tab[] = [
		{
			label: 'About',
			icon: information,
			tab: 'about'
		},
		{ label: 'Calendar', icon: calendar, tab: 'calendar' },
		{
			label: 'Lists',
			icon: list,
			tab: 'lists'
		},
		{
			label: 'Recipes',
			icon: receipt,
			tab: 'recipes'
		}
	];

	// export let currentRoute = '';
	let currentTab: Tab | undefined;

	const logStuff = (...args: any[]) => {
		const [event] = args;
		// console.log(event);
		// const route = event.detail.tab;
		const tab = TABS.find((tab) => tab.tab === event.detail.tab);
		// if (!tab) throw new Error(`Tab not found: ${event.detail.tab}`);
		currentTab = tab;
		// console.log(event.detail.tab);
	};
</script>

<ion-app>
	<ion-menu content-id="main-content" side="start">
		<!-- <ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header> -->
		<ion-content class="ion-padding">
			<ion-item
				on:click={() => {
					console.log('Hello');
				}}>
				<a href="/settings">Settings</a>
				<!-- <ion-button expand="block">Hello</ion-button> -->
			</ion-item>
			<!-- {#each menuItems as menuItem, i}
				<ion-item button on:click={() => (selected = i)}>{menuItem.name}</ion-item>
				<br/>
			{/each} -->
		</ion-content>
	</ion-menu>

	<!-- Header/toolbar: -->
	<ion-toolbar id="main-content">
		<ion-buttons slot="start">
			<ion-menu-button />
		</ion-buttons>
		<ion-title>{currentTab?.label ?? ''}</ion-title>
	</ion-toolbar>

	<!-- Bottom tabs: -->
	<IonTabs slot="bottom" tabs={TABS} ionTabsDidChange={logStuff}>
		<!-- ionTabsWillChange={logStuff} -->
		<slot />
	</IonTabs>
</ion-app>

<style global>
	ion-tab {
		/* This padding is for the ion-toolbar. */
		padding-top: 56px;
	}
</style>
