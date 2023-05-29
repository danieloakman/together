<script lang="ts">
	import { Add } from '$icons';
	const recipes = [{
		id: '1',
	}]
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
