<script>
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

<h2 class="mt-8 text-2xl font-bold">Early Voting</h2>
<hr class="mb-5 mt-2 h-0.5 bg-zinc-100" />

{#each result.early_voting as place}
	<div class="my-10 sm:flex">
		<div class="my-auto sm:w-1/3 md:mx-0 md:w-1/4">
			{#await fetchImage(place)}
				<div class="flex h-48">
					<div class="m-auto">
						<div class="spinner m-auto"></div>
						<p class="mt-4 text-center text-sm text-zinc-700">Loading image...</p>
					</div>
				</div>
			{:then imageUrl}
				<a href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}>
					<img src={imageUrl} alt="Early voting location map" class="max-h-56 rounded-md" /></a
				>
			{:catch error}
				<p>{error}</p>
			{/await}
		</div>
		<div class="my-auto mt-4 sm:my-auto sm:ml-6">
			<p class="text-lg font-bold">Address:</p>
			<p class="text-lg">
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`}
					class="underline underline-offset-4 transition-all duration-200 hover:bg-zinc-100"
					title="Find polling place on Google Maps">{place.name}<br />{place.address}</a
				>
			</p>
			<p class="mt-4 text-lg font-bold">
				Hours:<br />
				<span class="text-lg font-normal">8am-6pm, Oct. 30-Nov. 1<br />8am-2pm, Nov. 2</span>
			</p>
		</div>
	</div>
{/each}
