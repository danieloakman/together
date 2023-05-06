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

	import { calendar, list, receipt, home, arrowBack } from 'ionicons/icons';
	import { page } from '$app/stores';
	import { each } from 'svelte/internal';
	import { capitalise, iife } from '$lib/helpers/misc-util';

	interface Tab {
		label: string;
		icon: string;
		tab: string;
	}

	const TABS: Tab[] = [
		{
			label: 'Home',
			icon: home,
			tab: ''
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
		const tab = TABS.find((tab) => tab.tab === event.detail.tab);
		currentTab = tab;
	};

	function routesFromUrl(url: URL): string[] {
		const parts = url.pathname.split('/').filter(Boolean);
		return parts.length ? parts : ['Home'];
	}
</script>

<ion-app>
	<ion-menu content-id="main-content" side="end">
		<!-- <ion-header>
			<ion-toolbar>
				<ion-title>Menu Content</ion-title>
			</ion-toolbar>
		</ion-header> -->
		<ion-content class="ion-padding">
			<ion-item>
				<!-- <a href="/about">Settings</a> -->
				<ion-button expand="block">Settings</ion-button>
			</ion-item>
			<!-- {#each menuItems as menuItem, i}
				<ion-item button on:click={() => (selected = i)}>{menuItem.name}</ion-item>
				<br/>
			{/each} -->
		</ion-content>
	</ion-menu>

	<!-- Header/toolbar: -->
	<ion-toolbar id="main-content">
		<ion-buttons slot="end">
			<ion-menu-button />
		</ion-buttons>
		{#if routesFromUrl($page.url).length > 1}
			<a style="padding-left: 8px" href="..">
				<ion-icon icon={arrowBack} />
			</a>
		{/if}
		<ion-text style="padding-left: 8px">{routesFromUrl($page.url).map(capitalise).join(' / ')}</ion-text>
		<!-- <ion-breadcrumbs>
			{#each routesFromUrl($page.url) as route}
				<ion-breadcrumb style="font-size: 16px;">{route}</ion-breadcrumb>
			{/each}
		</ion-breadcrumbs> -->
		<!-- <ion-title>{currentTab?.label ?? ''}</ion-title> -->
	</ion-toolbar>

	<!-- Bottom tabs: -->
	<IonTabs slot="bottom" tabs={TABS} ionTabsWillChange={logStuff}>
		<slot />
	</IonTabs>
</ion-app>

<style global>
	ion-tab {
		/* This padding is for the ion-toolbar. */
		padding-top: 56px;
	}

	.tab-padding-top {
		/* This padding is for the ion-toolbar. */
		/* padding-top: 56px; */
		margin-top: 56px;
	}
</style>
