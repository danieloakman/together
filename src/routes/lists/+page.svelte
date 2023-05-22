<script lang="ts">
	function segmentChange(event: any) {
		currentSegment = event.detail.value;
	}
	type Segment = 'Shopping' | 'Todos';
	let currentSegment: Segment = 'Shopping';

</script>

<!-- <ion-tab tab="lists">
	<ion-segment value="Shopping" on:ionChange={segmentChange}>
		<ion-segment-button value="Shopping">
			<ion-label>Shopping</ion-label>
		</ion-segment-button>
		<ion-segment-button value="Todos">
			<ion-label>Todos</ion-label>
		</ion-segment-button>
	</ion-segment>
	{#if currentSegment === 'Shopping'}
		<ion-content class="ion-padding">Shopping</ion-content>
	{/if}
	{#if currentSegment === 'Todos'}
		<ion-content class="ion-padding">Todos</ion-content>
	{/if}
</ion-tab> -->
<span>
	Lists works!
</span>