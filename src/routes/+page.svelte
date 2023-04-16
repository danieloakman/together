<script lang="ts">
	import { Geolocation } from '@capacitor/geolocation';
  import { Filesystem } from '@capacitor/filesystem';

  function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  sleep(2000).then(async () => {
    const position = await Geolocation.getCurrentPosition();
    console.log(position.coords.latitude, position.coords.longitude);
    const perm = await Filesystem.checkPermissions();
    console.log({ perm });
  })

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
