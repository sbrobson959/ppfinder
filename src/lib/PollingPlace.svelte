<script>
	import { CircleAlert } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	export let result;

	$: mapImageUrl = `/api/static_map/${result.polling_place.lat}x${result.polling_place.lon}?zoom=18&size=800x800`;
	$: googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${result.polling_place.lat},${result.polling_place.lon}`;

	export let loading = true;
</script>

<div transition:slide>
	<h2 class="text-2xl font-bold">Polling Place</h2>
	<hr class="mb-5 mt-2 h-0.5 bg-zinc-100" />
	<div class="sm:flex">
		<div class="my-auto sm:w-1/3 md:mx-0 md:w-1/4">
			{#if loading}
				<div class="flex h-48">
					<div class="m-auto">
						<div class="spinner m-auto"></div>
						<p class="mt-4 text-center text-sm text-zinc-700">Loading image...</p>
					</div>
				</div>
			{/if}
			<a href={googleMapsLink} style:display={loading ? 'none' : 'block'}>
				<img
					src={mapImageUrl}
					alt="Map of polling place"
					class=" max-h-56 rounded-md"
					on:load={() => (loading = false)}
				/>
			</a>
		</div>
		<div class="my-auto mt-4 sm:my-auto sm:ml-6">
			<p class="text-lg font-bold">Address:</p>
			<p class="text-lg">
				<a
					href={googleMapsLink}
					class="underline underline-offset-4 transition-all duration-200 hover:bg-zinc-100"
					title="Find polling place on Google Maps"
					>{result.polling_place.name}<br />{result.polling_place.address}</a
				>
			</p>
			<p></p>
			<p class="mt-4 text-lg font-bold">
				Hours:<br /> <span class="text-lg font-normal">7am-7pm, Nov. 5</span>
			</p>
			<p class="text-base font-light">
				<CircleAlert class="-mt-1 inline" size="15" /> As long as you are in line by 7pm, you cannot
				be turned away.
			</p>
		</div>
	</div>
</div>

<style>
	/* Simple loading spinner */
	.spinner {
		border: 4px solid #f3f3f3;
		border-top: 4px solid gray;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
	}

	/* Spinner animation */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
