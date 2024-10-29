<script>
	import '../app.css';
	let { children } = $props();
</script>

<link rel="icon" type="image/png" href="/static/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/static/favicon/favicon.svg" />
<link rel="shortcut icon" href="/static/favicon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Tulsa Polls" />
<link rel="manifest" href="/static/favicon/site.webmanifest" />

{@render children()}

<style lang="postcss">
	:global(body) {
		@apply bg-blue-50;
	}
</style>
