<script>
  import { onMount } from "svelte";
  import { getDetailedHandleliste } from "../../api/api";
  import DetailItems from "./DetailItems.svelte";
  import { goto } from "$app/navigation";

  export let id = 0;

  let data = {};
  onMount(async () => {
    data = await getDetailedHandleliste(id);
  });

  let hideCollected = true;
  let hideToggleText = "Vis skjulte varer";

  const toggleHideCollected = () => {
    hideCollected = !hideCollected;
    if (hideCollected) hideToggleText = "Vis skjulte varer";
    else hideToggleText = "Skjul funnet varer";
  };
</script>

{#if data.handlelisteName}
  <div class="row m-0">
    <div class="col-12">
      <h1 class="text-center fs-1 fw-bold">{data.handlelisteName}</h1>
      <ul class="px-1">
        {#each data.varer as item}
          <DetailItems {item} {id} {hideCollected} />
        {/each}
      </ul>
    </div>
    <div class="col-12 btn-bottom-nav bg-dark pt-2 px-3 rounded-top-5">
      <button
        class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-3"
        on:click={() => goto("/edit/" + id)}>Edit</button
      >
    </div>
    <div class="col-12 btn-bottom-nav bg-dark pt-2 px-3 rounded-top-5">
      <button
        on:click={toggleHideCollected}
        class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-3"
        type="button"
        id="btn-submit">{hideToggleText}</button
      >
    </div>
  </div>
{:else}
  <p class="text-center fs-1 fw-bold">loading...</p>
{/if}

<style>
  ul {
    max-height: calc(
      100vh - 13.4rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }
  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
