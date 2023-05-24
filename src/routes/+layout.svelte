<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import {
		AppShell,
		Toast,
		Drawer
	} from '@skeletonlabs/skeleton';
	import {
		LogoutIcon,
		RefreshIcon,
		logout,
		darkMode,

		isDrawerOpen

	} from '$lib';
	import AppHeader from '$components/AppHeader.svelte';
	import AppFooter from '$components/AppFooter.svelte';
	import AppDrawer from '$components/AppDrawer.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppHeader />
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<AppFooter />
	</svelte:fragment>

	<slot />
</AppShell>

<AppDrawer />

<Toast />
