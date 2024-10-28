<script>
	export let result;
</script>

<h2 class="text-2xl font-bold mt-8">Political Districts</h2>
<hr class="mb-5 mt-2 h-0.5 bg-zinc-100" />
<div class="flex mb-5">
	<table class="min-w-96 grow text-lg font-medium">
		<tbody>
			<tr>
				<td class="w-80 border-2 px-2">County</td>
				<td class="border-2 px-2 font-light">{result.districts.county}</td>
			</tr>
			<tr>
				<td class="w-80 border-2 px-2">Precinct</td>
				<td class="border-2 px-2 font-light">{result.districts.short_precinct}</td>
			</tr>
			<tr>
				<td class="w-80 border-2 px-2">County Commissioner District</td>
				<td class="border-2 px-2 font-light">{result.districts.county_commissioner}</td>
			</tr>
			<tr>
				<td class="w-80 border-2 px-2">State House District</td>
				<td class="border-2 px-2 font-light">{result.districts.state_house}</td>
			</tr>
			<tr>
				<td class="border-2 px-2">State Senate District</td>
				<td class="border-2 px-2 font-light">{result.districts.state_senate}</td>
			</tr>
		</tbody>
	</table>
</div>
<!-- 
<td>US Congressional District</td>
<td>County Commissioner District</td>
<td>State House District</td>
<td>State Senate District</td> -->
