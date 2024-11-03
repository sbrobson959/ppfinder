<script>
	import { language } from '$lib/stores';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

	onMount(() => {
		// Set language to Spanish and redirect to root
		language.set('es');
		goto('/?lang=es');
	});
</script>
