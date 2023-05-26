<script lang="ts">
	import { Tab, TabGroup, localStorageStore } from '@skeletonlabs/skeleton';
	import { preferenceStore } from '$lib';

	// function segmentChange(event: any) {
	// 	currentSegment = event.detail.value;
	// }
	// type Segment = 'Shopping' | 'Todos';
	// let currentSegment: Segment = 'Shopping';
	const tab = preferenceStore('lists/tab', 0);
	// const tab = localStorageStore('lists/tab', 0);
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={$tab} name="tab1" value={0}>(label)</Tab>
	<Tab bind:group={$tab} name="tab2" value={1}>(label)</Tab>
	<Tab bind:group={$tab} name="tab3" value={2}>(label)</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if $tab === 0}
			(tab panel 1 contents)
		{:else if $tab === 1}
			(tab panel 2 contents)
		{:else if $tab === 2}
			(tab panel 3 contents)
		{/if}
	</svelte:fragment>
</TabGroup>
<!-- <ion-tab tab="lists">
	<ion-segment value="Shopping" on:ionChange={segmentChange}>
		<ion-segment-button value="Shopping">
			<ion-label>Shopping</ion-label>
		</ion-segment-button>
		<ion-segment-button value="Todos">
			<ion-label>Todos</ion-label>
		</ion-segment-button>
	</ion-segment>
	{#if currentSegment === 'Shopping'}
		<ion-content class="ion-padding">Shopping</ion-content>
	{/if}
	{#if currentSegment === 'Todos'}
		<ion-content class="ion-padding">Todos</ion-content>
	{/if}
</ion-tab> -->
<span> Lists works! </span>
