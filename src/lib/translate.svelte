<!-- src/lib/translate.svelte -->
<script context="module">
	import { derived } from 'svelte/store';
	import { language } from './stores';
	import { translations } from './translations.js';

	// Reactive translation function
	export const t = derived(language, ($language) => (...keys) => {
		return keys.reduce((acc, key) => acc?.[key], translations[$language]) || keys.join('.');
	});
</script>
