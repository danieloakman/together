<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import Drawer from '$components/Drawer.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>

	<slot />
</AppShell>

<Drawer />

<Toast />
