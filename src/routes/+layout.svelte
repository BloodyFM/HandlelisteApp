<script>
  import MainNavigation from "../components/layout/MainNavigation.svelte";
  import "../app.css";
  import { isLoggedIn } from "../store/auth";
  import { onMount } from "svelte";
  import { key } from "../store/auth";

  onMount(async () => {
    const fetchKey = localStorage.getItem("key");
    if (fetchKey) key.set(fetchKey);
  });
</script>

<main>
  <slot />
</main>

{#if $isLoggedIn}
  <MainNavigation />
{/if}

<style>
</style>
