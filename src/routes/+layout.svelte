<!-- src/routes/+layout.svelte -->
<script>
  import Nav from '$lib/Nav.svelte';
</script>

<Nav />

<main>
  <slot />
</main>

<style>
  main {
    padding: 1em;
  }
</style>
