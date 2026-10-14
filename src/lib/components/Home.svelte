<script lang="ts">
	import AgentStrip from './AgentStrip.svelte';
	import Hero from './Hero.svelte';
	import ProjectList from './ProjectList.svelte';
	import Seo from './Seo.svelte';
	import Shell from './Shell.svelte';
	import { agents } from '#lib/data/agents.js';
	import { projects } from '#lib/data/projects.js';
	import { href } from '#lib/routes.js';
	import type { Dictionary } from '#lib/i18n/index.js';

	let { d }: { d: Dictionary } = $props();
</script>

<Seo path={href('home')} title={d.title} description={d.metaDescription} />

<Shell {d}>
	<Hero {d} {projects} {agents} />
	<AgentStrip {d} {agents} />
	<ProjectList {d} {projects} />
</Shell>
