<script>
	import {
		logout,
		darkMode,
		isDrawerOpen,
		RefreshIcon,
		LogoutIcon,
		currentUserAvatar,
		currentUser,
		family
	} from '$lib';
	import { Avatar, Drawer } from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';
</script>

<Drawer
	position="right"
	width="w-[280px] md:w-[480px]"
	padding="p-4"
	rounded="rounded-xl"
	bgBackdrop="bg-gradient-to-tr from-primary-500/50 via-tertiary-500/50 to-secondary-500/50"
>
	{#if $isDrawerOpen}
		<div class="m-4 flex justify-between">
			<button class="btn-icon variant-filled-primary" on:click={family.reload}>
				<RefreshIcon />
			</button>

			<button class="btn varient-filled-primary" on:click={darkMode.toggle}>Swap</button>

			<Avatar src={$currentUserAvatar} />

			<button class="btn-icon variant-filled-primary" on:click={logout}>
				<LogoutIcon />
			</button>
		</div>

		{#await $family then fam}
			<span>{fam?.name ?? 'No family'}</span>
		{/await}

		<!-- {#await $myAgent then myAgent}
			<div class="mx-4">
				<JsonView json={myAgent} />
			</div>
		{/await} -->

		<!-- {#await sleep(1000) then _}
			{#await $myAgent then myAgent}
				<div class="mx-4">
					<JsonView json={myAgent} />
				</div>
			{/await}
		{/await} -->

		<!-- {#await $headquarters then headquarters}
			<div class="m-4">
				<JsonView json={headquarters} depth={1}/>
			</div>
		{/await} -->
	{/if}
</Drawer>
