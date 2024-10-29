<title>Tulsa Polling Places</title>

<script>
	import { OctagonX } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import PollingPlace from '$lib/PollingPlace.svelte';
	import Autocomplete from '$lib/Autocomplete.svelte';
	import Districts from '$lib/Districts.svelte';
	import { tick } from 'svelte';
	import EarlyVoting from '../lib/EarlyVoting.svelte';

	export let noPrecinctFound = false;
	export let badGateway = false;
	export let result = null;

	let addressSelected;
	let geocode;
	let loading;

	async function updateResult() {
		noPrecinctFound = false;
		addressSelected = false;
		loading = true;
		await tick();
		const { lat, lon } = geocode;
		const url = `https://ppfinder.fly.dev/by_geocode?lat=${lat}&lon=${lon}`;
		console.log(url);
		const response = await fetch(url);
		if (response.ok) {
			try {
				result = await response.json();
				console.log(result);
			} catch (error) {
				noPrecinctFound = true;
			}
		} else {
			badGateway = true;
		}
	}

	$: if (addressSelected) {
		updateResult();
	}
</script>

<div class="mx-auto my-6 max-w-5xl">
	<div class="mx-2 max-w-5xl rounded-xl border-2 border-zinc-200 bg-white p-6 text-2xl shadow-md">
		<h1 class="text-3xl font-bold">
			Find your polling place for the November 5 election in Tulsa.
		</h1>
		<div class="my-5 flex">
			<Autocomplete bind:addressSelected bind:geocode />
		</div>
		{#if noPrecinctFound}
			<div transition:slide={{ duration: 300 }} class="my-5">
				<div class="flex rounded-lg bg-red-100 p-4 text-lg">
					<OctagonX class="my-auto mr-3.5 stroke-red-700" size="40" />
					<p class="my-auto text-base font-medium">
						We could not locate your precinct. Please use the <a
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
							href="https://okvoterportal.okelections.us">Oklahoma Voter Portal</a
						>
						or call your
						<a
							href="https://oklahoma.gov/elections/about-us/county-election-boards/county-election-board-directory.html"
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
							>local election board</a
						> to find your polling place.
					</p>
				</div>
			</div>
		{/if}
		{#if badGateway}
			<div class="my-5" transition:slide={{ duration: 300 }}>
				<div class="flex rounded-lg bg-red-100 p-4 text-lg">
					<OctagonX class="my-auto mr-3.5 stroke-red-700" size="40" />
					<p class="my-auto text-base font-medium">
						The server returned a 502 Gateway Error. Please try again later. Contact <a
							href="mailto:sam@terencecrutcherfoundation.org"
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
							>Sam Robson</a
						>
						or call our office at
						<a
							href="tel:+15398571304"
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
							>(539) 857-1304</a
						> for further assistance.
					</p>
				</div>
			</div>
		{/if}
		{#if result && result.polling_place}
			<PollingPlace bind:result bind:loading />
		{:else if result}
			<div class="flex rounded-lg bg-red-100 p-4 text-lg" transition:slide>
				<OctagonX class="my-auto mr-3.5 stroke-red-700" size="40" />
				<p class="my-auto text-base font-medium">
					We do not have your polling place on record. Please use the <a
						class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200"
						href="https://okvoterportal.okelections.us">Oklahoma Voter Portal</a
					>
					or call your
					<a
						href="https://oklahoma.gov/elections/about-us/county-election-boards/county-election-board-directory.html"
						class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200"
						>local election board</a
					> to find your polling place.
				</p>
			</div>
		{/if}
		{#if result}
        <div transition:slide>
            <EarlyVoting bind:result />
			<Districts bind:result />
        </div>
		{/if}
	</div>
</div>

<!-- <footer class="text-center text-sm text-zinc-500 mb-10">© 2024 Terence Crutcher Foundation</footer> -->
