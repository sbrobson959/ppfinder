<script>
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style lang="postcss">
	:global(body) {
		@apply bg-blue-50;
	}
</style>
