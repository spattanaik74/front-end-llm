<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<nav>
  <a on:click={() => goto('/')} href="javascript:void(0)">Home</a>
  <a on:click={() => goto('/about')} href="javascript:void(0)">About</a>
  <a on:click={() => goto('/contact')} href="javascript:void(0)">Contact</a>
</nav>


