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
  <div class="container-fluid container-max-width bg-custom p-0">
    <slot />
  </div>
</main>

{#if $isLoggedIn}
  <MainNavigation />
{/if}

<style>
  .container-max-width {
    max-width: 800px;
  }
  .bg-custom {
    background-color: var(--colorBg) !important;
  }
</style>
