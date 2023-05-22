<!-- <script lang="ts">
	export let value = '';
	export let type:
		| 'number'
		| 'text'
		| 'password'
		| 'time'
		| 'search'
		| 'tel'
		| 'url'
		| 'email'
		| 'date'
		| 'datetime-local'
		| 'month'
		| 'week' = 'text';
  export let placeholder = '';
  export let label = '';
  export let labelPlacement: "stacked" | "floating" | "fixed" | "end" | "start" | undefined = undefined;
	export let disabled = false;
</script>

<ion-input
	{type}
  {placeholder}
  {label}
	{disabled}
  label-placement={labelPlacement}
	value={value}
	on:ionChange={(event) => {
		value = (event.detail.value ?? '').toString();
	}}
>
	<slot />
</ion-input> -->
