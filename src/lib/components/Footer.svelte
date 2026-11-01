<script lang="ts">
  import type { Dictionary } from "#lib/i18n/index.js";

  let { d }: { d: Dictionary } = $props();
</script>

<footer class="footer">
  <span>{d.footer.contact}</span>
  <span><a href="mailto:hello@aivara.se">hello@aivara.se</a></span>
</footer>

<style>
  .footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-top: var(--space-xl);
    font-size: 13.5px;
    color: var(--tertiary);
  }

  .footer a {
    color: var(--tertiary);
  }

  .footer a:hover {
    color: var(--primary-hover);
  }
</style>
