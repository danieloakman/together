<script lang="ts">
	import { Filesystem as fs, Directory } from '@capacitor/filesystem';

	export let dir = '';

	$: {
		(async () => {
			console.log({ dir });
			const r = await fs.readdir({ path: dir });
      // await fs.requestPermissions();
			console.log(r);
		})();
	}
</script>

<!-- <input type="file" webkitdirectory directory multiple on:change={onChange}/> -->
<ion-input
	name="Directory"
	type="text"
	on:ionChange={(e) => {
		if (typeof e.detail.value === 'string') dir = e.detail.value;
	}}
/>
