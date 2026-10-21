<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="icon"
		type="image/svg+xml"
		href="/favicon-light.svg"
		media="(prefers-color-scheme: light)"
	/>
	<link
		rel="icon"
		type="image/svg+xml"
		href="/favicon-dark.svg"
		media="(prefers-color-scheme: dark)"
	/>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

{@render children()}
