<script lang="ts">
	interface Departure {
		link: string;
		destinationStop: string;
		time: string;
		platform: string;
	}

	export let departures: Departure[] = [];
	export let stopName: string;
</script>

<section>
	<h1>Departures from <span style="font-weight: 600;">{stopName}</span></h1>

	<table class="table">
		<thead>
			<tr>
				<th>Line</th>
				<th>Destination</th>
				<th>Arrival</th>
				<!-- <th>Platform</th> -->
			</tr>
		</thead>
		<tbody>
			{#each departures as departure}
				<tr>
					<td>{departure.link}</td>
					<td>{departure.destinationStop}</td>
					<td>{departure.time}</td>
					<!-- <td>{departure.platform}</td> -->
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}
</style>
