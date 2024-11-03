<script>
	import { t } from '$lib/translate.svelte';

	export let result;
</script>

<h2 class="mt-8 text-2xl font-bold">{$t('politicalDistricts')}</h2>
<hr class="mb-5 mt-2 h-0.5 bg-zinc-100" />
<div class="mb-5 flex">
	<table class=" grow text-lg font-medium">
		<tbody>
			<tr>
				<td class="border-2 px-2">{$t('county')}</td>
				<td class="border-2 px-2 font-light">{result.districts.county}</td>
			</tr>
			<tr>
				<td class="border-2 px-2">{$t('precinct')}</td>
				<td class="border-2 px-2 font-light">{result.districts.short_precinct}</td>
			</tr>
			<tr>
				<td class="border-2 px-2">{$t('countyCommissionerDistrict')}</td>
				<td class="border-2 px-2 font-light">{result.districts.county_commissioner}</td>
			</tr>
			<tr>
				<td class="border-2 px-2">{$t('stateHouseDistrict')}</td>
				<td class="border-2 px-2 font-light">{result.districts.state_house}</td>
			</tr>
			<tr>
				<td class="border-2 px-2">{$t('stateSenateDistrict')}</td>
				<td class="border-2 px-2 font-light">{result.districts.state_senate}</td>
			</tr>
		</tbody>
	</table>
</div>
