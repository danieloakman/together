<script>
	import { logout, darkMode, isDrawerOpen, RefreshIcon, LogoutIcon, currentUser, fileUrl } from '$lib';
	import { Avatar, Drawer } from '@skeletonlabs/skeleton';
	import { derived } from 'svelte/store';

	const userAvatar = derived(currentUser, $u => {
		if (!$u?.avatar) return 'default-avatar.png';
		return fileUrl($u.collectionId, $u.id, $u.avatar);
	})
</script>

<Drawer
	position="right"
	width="w-[280px] md:w-[480px]"
	padding="p-4"
	rounded="rounded-xl"
	bgBackdrop="bg-gradient-to-tr from-yellow-500/50 via-purple-500/50 to-red-500/50"
>
	{#if $isDrawerOpen}
		<div class="m-4 flex justify-between">
			<button class="btn-icon variant-filled-primary">
				<RefreshIcon />
			</button>

			<button class="btn varient-filled-primary" on:click={darkMode.toggle}>Swap</button>

			<Avatar src={$userAvatar}/>

			<button class="btn-icon variant-filled-primary" on:click={logout}>
				<LogoutIcon />
			</button>
		</div>

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
