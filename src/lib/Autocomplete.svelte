<script>
	import { onMount } from 'svelte';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { t } from '$lib/translate.svelte';

	let autocompleteInput;
	export let geocode = { lat: null, lon: null };
	export let selectedAddress = '';
	export let addressSelected = false;

	onMount(() => {
		if (typeof google !== 'undefined') {
			initAutocomplete();
		} else {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
			script.async = true;
			script.onload = initAutocomplete;
			document.head.appendChild(script);
		}
	});

	function initAutocomplete() {
		// Set Tulsa, Oklahoma bounds for location bias
		const tulsaBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(35.939, -96.034), // Southwest corner of Tulsa area
			new google.maps.LatLng(36.487, -95.71) // Northeast corner of Tulsa area
		);

		const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
			types: ['address'],
			componentRestrictions: { country: 'us' }, // Restrict to US addresses
			bounds: tulsaBounds // Set bias toward Tulsa
		});

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (place.geometry) {
				geocode = {
					lat: place.geometry.location.lat(),
					lon: place.geometry.location.lng()
				};
				selectedAddress = place.formatted_address;
				addressSelected = true;
			}
		});
	}
</script>

<!-- Autocomplete input -->
<input
	bind:this={autocompleteInput}
	type="text"
	placeholder={$t('searchBarPlaceholder')}
	class="autocomplete-input"
/>

<style>
	.autocomplete-input {
		width: 100%;
		padding: 8px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
