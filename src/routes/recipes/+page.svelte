<script lang="ts">
	import { Add } from '$icons';
	import { pb } from '$services';
	const recipes = [
		{
			id: '1'
		}
	];

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

	<a
		class="btn-icon btn-icon-xl variant-filled-primary absolute bottom-4 right-4"
		href="recipes/add"
	>
		<Add />
	</a>
</div>
