<script lang="ts">
	// import IonTabs from 'ionic-svelte/components/IonTabs.svelte';
	// import { calendar, list, receipt, home, arrowBack } from 'ionicons/icons';
	// import { page } from '$app/stores';
	// import { capitalise, logout, currentUser, currentUserAvatar } from '$lib';
	// import { writable } from 'svelte/store';

	// interface Tab {
	// 	label: string;
	// 	icon: string;
	// 	tab: string;
	// }

	// const TABS: Tab[] = [
	// 	{
	// 		label: 'Home',
	// 		icon: home,
	// 		tab: ''
	// 	},
	// 	{ label: 'Calendar', icon: calendar, tab: 'calendar' },
	// 	{
	// 		label: 'Lists',
	// 		icon: list,
	// 		tab: 'lists'
	// 	},
	// 	{
	// 		label: 'Recipes',
	// 		icon: receipt,
	// 		tab: 'recipes'
	// 	}
	// ];

	// export const currentTab = writable(TABS[0]);

	// const logStuff = (...args: any[]) => {
	// 	const [event] = args;
	// 	const tab = TABS.find((tab) => tab.tab === event.detail.tab);
	// 	if (tab) currentTab.set(tab);
	// };

	// function routesFromUrl(url: URL): string[] {
	// 	const parts = url.pathname.split('/').filter(Boolean);
	// 	return parts.length ? parts : ['Home'];
	// }
</script>

<!-- <ion-menu content-id="main-content" side="end">
	<ion-content class="ion-padding">
		<ion-item>
			<ion-text>
				<span>
					{$currentUser?.name}
				</span>
			</ion-text>
			<ion-avatar slot="end"><img alt="User Avatar" src={$currentUserAvatar} /></ion-avatar>
		</ion-item>

		<ion-button expand="block" on:keydown={logout} on:click={logout}>Log out</ion-button>
	</ion-content>
</ion-menu> -->

<!-- Header/toolbar: -->
<!-- <ion-toolbar id="main-content">
	<ion-buttons slot="end">
		<ion-menu-button />
	</ion-buttons>
	{#if routesFromUrl($page.url).length > 1}
		<a style="padding-left: 8px" href="..">
			<ion-icon icon={arrowBack} />
		</a>
	{/if}
	<ion-text style="padding-left: 8px"
		>{routesFromUrl($page.url).map(capitalise).join(' / ')}</ion-text
	>
</ion-toolbar> -->

<!-- Bottom tabs: -->
<!-- <IonTabs slot="bottom" tabs={TABS} ionTabsWillChange={logStuff}>
	<slot />
</IonTabs>

<style>
	ion-item {
		padding-bottom: 8px;
	}
</style> -->
