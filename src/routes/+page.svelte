<script lang="ts">
	import { Geolocation } from '@capacitor/geolocation';
  import { Filesystem } from '@capacitor/filesystem';
  import { onMount } from 'svelte';

  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  onMount(async () => {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude, position.coords.longitude);
    const perm = await Filesystem.checkPermissions();
    console.log({ perm });
  });

  let count = 1;
  function increment() {
    count += 1;
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>cool ok</p>
<button on:click={increment}>Count +{count}</button>