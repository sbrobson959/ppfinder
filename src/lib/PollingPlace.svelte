<script>
	import { CircleAlert } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import { t } from '$lib/translate.svelte';

	export let result;

	$: mapImageUrl = `/api/static_map/${result.polling_place.lat}x${result.polling_place.lon}?zoom=18&size=800x800`;
	$: googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${result.polling_place.lat},${result.polling_place.lon}`;

	export let loading = true;
</script>

<div transition:slide>
	<h2 class="mt-5 text-2xl font-bold">{$t('pollingPlace')}</h2>
	<hr class="mb-2 mt-2 h-0.5 bg-zinc-100" />
	<div class="my-8 sm:flex">
		<div class="h-40 w-40 sm:h-56 sm:w-56 md:mx-0">
			{#if loading}
				<div class="inline-flex h-40 w-40 sm:h-56 sm:w-56">
					<div class="m-auto">
						<div class="spinner m-auto"></div>
						<p class="mt-4 text-center text-sm text-zinc-700">{$t('loadingImage')}</p>
					</div>
				</div>
			{/if}
			<div
				class="flex h-40 w-40 sm:h-56 sm:w-56"
				style:display={loading ? 'none' : 'inline-flex'}
			>
				<a href={googleMapsLink} class="">
					<img
						src={mapImageUrl}
						alt={$t('mapOfPollingPlace')}
						title={$t('mapOfPollingPlace')}
						class="rounded-md"
						on:load={() => (loading = false)}
					/>
				</a>
			</div>
		</div>
		<div class="mt-4 flex-col sm:my-auto sm:ml-6 ">
			<div class="my-auto">
				<p class="items-center text-lg font-bold">{$t('address')}:</p>
				<p class="text-lg">
					<a
						href={googleMapsLink}
						class="underline underline-offset-4 transition-all duration-200 hover:bg-zinc-100"
						title={$t('findOnGoogleMaps')}
						>{result.polling_place.name}<br />{result.polling_place.address}</a
					>
				</p>
				<p></p>
				<p class="mt-4 text-lg font-bold">
					{$t('hours')}:<br /> <span class="text-lg font-normal">{$t('inPersonHours')}</span>
				</p>
				<p class="text-base font-light">
					<CircleAlert class="-mt-1 inline" size="15" />
					{$t('cantBeTurnedAway')}
				</p>
			</div>
		</div>
	</div>
</div>
