<script lang="ts">
	import { Add } from '$icons';
	import { currentUser, pb } from '$services';
	import type { Family } from '$types';
	import { get } from 'svelte/store';
	const recipes = [
		{
			id: '1'
		}
	];

	async function update() {
		const user = get(currentUser);
		if (!user) return;
		// const prevName = user.expands.family?.name;
		// if (!prevName) return;
		pb.collection('families').update<Family>(user.family, {
			name: Math.random().toString(),
			recipes: [{ id: '' }]
		});
	}

	// families().then(console.log);
	// pb.collection('users').getList(1, 20, { $autoCancel: false, expand: 'families' }).then(console.log)
</script>

<div class="relative h-full">
	<nav class="list-nav">
		<ul>
			{#each recipes as recipe}
				<li>
					<a href="recipes/{recipe.id}">
						<span class="badge bg-primary-500">💀</span>
						<span class="flex-auto">{recipe.id}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<button class="btn variant-filled-primary" on:click={update}>Update</button>

	<a
		class="btn-icon btn-icon-xl variant-filled-primary absolute bottom-4 right-4"
		href="recipes/add"
	>
		<Add />
	</a>
</div>
