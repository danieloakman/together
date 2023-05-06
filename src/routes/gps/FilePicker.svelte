<script lang="ts">
	import { Filesystem as fs, Directory } from '@capacitor/filesystem';

	export let dir = '';

	$: {
		(async () => {
			console.log({ dir });
			const r = await fs.writeFile({ path: dir, directory: Directory.Cache, data: 'test' });
			console.log(r);
			const r2 = await fs.readFile({ path: dir, directory: Directory.Cache });
			console.log(r2);
      // await fs.requestPermissions();
		})();
	}
</script>

<!-- <input type="file" webkitdirectory directory multiple on:change={onChange}/> -->
<ion-item>
	<ion-input
		label="Pick a directory"
		label-placement="floating"
		name="Directory"
		type="text"
		on:ionChange={(e) => {
			if (typeof e.detail.value === 'string') dir = e.detail.value;
		}}
	/>
</ion-item>
