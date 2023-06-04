<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { CalendarIcon, CheckListIcon, HomeIcon, MenuBookIcon, currentUser } from '$lib';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	const tabSet = writable('/');
	tabSet.subscribe((value) => {
		if (browser) goto(value);
	});
</script>

{#if $currentUser != null}
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full"
	>
		<Tab class="flex justify-center" bind:group={$tabSet} name="home" value={'/'}>
			<svelte:fragment slot="lead"><HomeIcon /></svelte:fragment>
		</Tab>

		<Tab class="flex justify-center" bind:group={$tabSet} name="calendar" value={'/calendar'}>
			<svelte:fragment slot="lead"><CalendarIcon /></svelte:fragment>
		</Tab>

		<Tab class="flex justify-center" bind:group={$tabSet} name="lists" value={'/lists'}>
			<svelte:fragment slot="lead"><CheckListIcon /></svelte:fragment>
		</Tab>

		<Tab class="flex justify-center" bind:group={$tabSet} name="recipes" value={'/recipes'}>
			<svelte:fragment slot="lead"><MenuBookIcon /></svelte:fragment>
		</Tab>

		<!-- <Tab class="flex justify-center" bind:group={$tabSet} name="settings" value={'/settings'}>
			<svelte:fragment slot="lead"><MenuBookIcon /></svelte:fragment>
		</Tab> -->
	</TabGroup>
{/if}
