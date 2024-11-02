<script>
	import { t } from '$lib/translate.svelte';
	import { OctagonX, Earth } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import PollingPlace from '$lib/PollingPlace.svelte';
	import Autocomplete from '$lib/Autocomplete.svelte';
	import Districts from '$lib/Districts.svelte';
	import EarlyVoting from '$lib/EarlyVoting.svelte';
	import { language } from '$lib/stores.js';

	export let noPrecinctFound = false;
	export let badGateway = false;
	export let result = null;

	let addressSelectedOnce;
	let addressSelected;
	let geocode;
	let loading;

	async function updateResult() {
		addressSelectedOnce = true;
		noPrecinctFound = false;
		badGateway = false;
		addressSelected = false;
		loading = true;
		const { lat, lon } = geocode;
		const url = `https://ppfinder.fly.dev/by_geocode?lat=${lat}&lon=${lon}`;
		const response = await fetch(url);
		if (response.ok) {
			try {
				result = await response.json();
				console.log(result);
			} catch (error) {
				noPrecinctFound = true;
				result = null;
			}
		} else {
			badGateway = true;
		}
	}

	$: if (addressSelected) {
		updateResult();
	}
</script>

<title>{$t('title')}</title>

<div
	class="transition-translate mx-auto flex min-h-screen max-w-5xl items-center justify-center"
	class:items-start={addressSelectedOnce}
>
	<div class="mx-auto mb-20 bg-blue-50">
		<div class="m-4 max-w-5xl rounded-xl border-2 border-zinc-200 bg-white p-6 text-2xl shadow-md">
			<h1 class="text-3xl font-bold">
				{$t('header')}
			</h1>
			<div class="my-5 flex">
				<Autocomplete bind:addressSelected bind:geocode />
			</div>
			<p class="text-center text-sm text-zinc-600" class:mb-4={addressSelectedOnce}>
				<Earth class="-mt-px mr-1 inline stroke-zinc-500" size="19" />
				<button
					on:click={() => language.set('en')}
					class="underline underline-offset-2 transition-all duration-300 hover:bg-zinc-100 hover:underline-offset-4"
					>English</button
				>
				|
				<button
					on:click={() => language.set('es')}
					class="underline underline-offset-2 transition-all duration-300 hover:bg-zinc-100 hover:underline-offset-4"
					>Español</button
				>
			</p>
			{#if noPrecinctFound}
				<div transition:slide={{ duration: 300 }} class="my-5">
					<div class="flex rounded-lg bg-red-100 p-4 text-lg">
						<OctagonX class="my-auto mr-3.5 w-20 stroke-red-700 sm:w-auto" size="40" />
						<p class="my-auto text-base font-medium">
							{$t('couldNotLocatePrecinct', 'part1')}
							<a
								class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
								href="https://okvoterportal.okelections.us">{$t('voterPortal')}</a
							>
							{$t('couldNotLocatePrecinct', 'part2')}
							<a
								href="https://oklahoma.gov/elections/about-us/county-election-boards/county-election-board-directory.html"
								class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
								>{$t('localElectionBoard')}</a
							>
							{$t('couldNotLocatePrecinct', 'part3')}
						</p>
					</div>
				</div>
			{/if}
			{#if badGateway}
				<div class="my-5" transition:slide={{ duration: 300 }}>
					<div class="flex rounded-lg bg-red-100 p-4 text-lg">
						<OctagonX class="my-auto mr-3.5 w-20 stroke-red-700 sm:w-auto" size="40" />
						<p class="my-auto text-base font-medium">
							{$t('badGateway', 'part1')}
							<a
								href="mailto:sam@terencecrutcherfoundation.org"
								class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
								>Sam Robson</a
							>
							{$t('badGateway', 'part2')}
							<a
								href="tel:+15398571304"
								class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200 hover:decoration-2"
								>(539) 857-1304</a
							>
							{$t('badGateway', 'part3')}
						</p>
					</div>
				</div>
			{/if}
			{#if result && result.polling_place}
				<PollingPlace bind:result bind:loading />
			{:else if result}
				<div class="flex rounded-lg bg-red-100 p-4 text-lg" transition:slide>
					<OctagonX class="my-auto mr-3.5 w-20 stroke-red-700 sm:w-auto" size="40" />
					<p class="my-auto text-base font-medium">
						{$t('pollingPlaceNotOnRecord', 'part1')}
						<a
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200"
							href="https://okvoterportal.okelections.us">{$t('voterPortal')}</a
						>
						{$t('pollingPlaceNotOnRecord', 'part2')}
						<a
							href="https://oklahoma.gov/elections/about-us/county-election-boards/county-election-board-directory.html"
							class="underline decoration-1 underline-offset-4 transition-all hover:bg-red-200"
							>{$t('localElectionBoard')}</a
						>
						{$t('pollingPlaceNotOnRecord', 'part3')}
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
</div>
