<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ChevronLeftIcon, MenuIcon, MenuOpenIcon, currentUser, isDrawerOpen, routes } from "$lib";
	import { AppBar, drawerStore } from "@skeletonlabs/skeleton";

  function canGoBack(routes: string[]): boolean {
		if (['about', 'settings'].includes(routes[0])) return true;
		if (routes.length > 1) return true;
    return false;
	}

	function goBack(routes: string[]) {
		const current = routes.pop();
		if (!current) return;
		goto('/' + routes.join('/'));
	}
</script>

{#if $currentUser != null}
	<AppBar>
		<svelte:fragment slot="lead">
			<button
				disabled={!canGoBack($routes)}
				class="btn-icon btn-sm variant-filled-primary my-0 py-0"
				on:click={() => goBack($routes)}
			>
				<ChevronLeftIcon />
			</button>
		</svelte:fragment>


		<ol class="breadcrumb">
			{#each $routes as route, i}
				<li class="crumb">{route}</li>
				{#if i < $routes.length - 1}
					<li class="crumb-separator" aria-hidden>/</li>
				{/if}
			{/each}
		</ol>
				
		<!-- {$page.route.id} -->

		<svelte:fragment slot="trail">
			<button
				class="btn-icon variant-filled-primary"
				on:click={() => ($isDrawerOpen ? drawerStore.close() : drawerStore.open())}
			>
				{#if $isDrawerOpen}
					<MenuOpenIcon />
				{:else}
					<MenuIcon />
				{/if}
			</button>
		</svelte:fragment>
	</AppBar>
{/if}
