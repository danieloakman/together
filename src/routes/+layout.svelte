<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import AppHeader from '$components/Header.svelte';
	import AppFooter from '$components/Footer.svelte';
	import AppDrawer from '$components/Drawer.svelte';
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
