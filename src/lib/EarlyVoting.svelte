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
	<div class="my-8 sm:flex">
		<div class="my-auto flex h-40 w-40 sm:h-56 sm:w-56">
			{#await fetchImage(place)}
				<div class="mx-auto -mt-4 flex min-h-max rounded-md sm:mt-0 sm:max-h-56">
					<div class="m-auto">
						<div class="spinner m-auto"></div>
						<p class="mt-4 text-center text-xs text-zinc-700">{$t('loadingImage')}</p>
					</div>
				</div>
			{:then imageUrl}
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
					class="my-auto inline-block"
					alt={$t('earlyVotingLocationMap')}
					title={$t('earlyVotingLocationMap')}
					aria-label={$t('earlyVotingLocationMap')}
				>
					<img
						src={imageUrl}
						alt={$t('earlyVotingLocationMap')}
						title={$t('earlyVotingLocationMap')}
						aria-label={$t('earlyVotingLocationMap')}
						class="-mt-4 max-h-40 rounded-md sm:mt-0 sm:max-h-56"
					/></a
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
					title={$t('findOnGoogleMaps')}
					>{place.name}<br />{place.address}
				</a>
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
