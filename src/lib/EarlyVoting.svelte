<script>
	import { t } from '$lib/translate.svelte';

	export let result;

	async function fetchImage(place) {
		const response = await fetch(`/api/static_map/${place.lat}x${place.lon}?zoom=18&size=800x800`);
		if (!response.ok)
			throw new Error(`Failed to load map image for lat=${place.lat}, lon=${place.lon}`);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		return url;
	}
</script>

<h2 class="mt-8 text-2xl font-bold">{$t('earlyVoting')}</h2>
<hr class="mb-5 mt-2 h-0.5 bg-zinc-100" />

{#each result.early_voting as place}
	<div class="my-10 sm:flex">
		<div class="my-auto sm:w-1/3 md:mx-0 md:w-1/4">
			{#await fetchImage(place)}
				<div class="flex h-48">
					<div class="m-auto">
						<div class="spinner m-auto"></div>
						<p class="mt-4 text-center text-sm text-zinc-700">{$t('loadingImage')}</p>
					</div>
				</div>
			{:then imageUrl}
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
					class="inline-block"
				>
					<img src={imageUrl} alt={$t('earlyVotingLocationMap')} class="max-h-56 rounded-md" /></a
				>
			{:catch error}
				<p class="text-sm">{$t('errorLoadingImage')}: {error}</p>
			{/await}
		</div>
		<div class="my-auto mt-4 sm:my-auto sm:ml-6">
			<p class="text-lg font-bold">{$t('address')}:</p>
			<p class="text-lg">
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
					class="underline underline-offset-4 transition-all duration-200 hover:bg-zinc-100"
					title={$t('findOnGoogleMaps')}>{place.name}<br />{place.address}</a
				>
			</p>
			<p class="mt-4 text-lg font-bold">
				{$t('hours')}:<br />
				<span class="text-lg font-normal"
					>{$t('earlyVotingHoursLine1')}<br />{$t('earlyVotingHoursLine2')}</span
				>
			</p>
		</div>
	</div>
{/each}
