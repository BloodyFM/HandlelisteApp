<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getHandlelister } from "../../api/api";
  import ListElement from "./ListElement.svelte";
  import { handlelister } from "../../store/handleliste";
  import { key } from "../../store/auth";

  let dataLoaded = false;
  let data = [];
  onMount(async () => {
    $handlelister = [];
    const userId = $key;
    if (userId != "") {
      data = await getHandlelister(userId); // "y0Wm7bG22RgyL3pn15PAHIktQuA3"
      for (const item of data) {
        addElement(item.handlelisteId, item.handlelisteName);
      }

      dataLoaded = true;
    }
  });

  const addElement = (id, name) => {
    var l = $handlelister.length;
    $handlelister[l] = { id, name };
  };
</script>

<div class="row m-0 p-0">
  <h1 class="col-12 text-center my-5">Handlelister</h1>

  <ul class="px-3">
    {#if dataLoaded && data.length > 0}
      {#each $handlelister as item}
        <ListElement id={item.id} title={item.name} />
        {#if item != $handlelister[$handlelister.length - 1]}
          <hr />
        {/if}
      {/each}
    {:else if dataLoaded}
      <p>Ingen lister funnet</p>
    {:else}
      <p>loading...</p>
    {/if}
  </ul>

  <div class="col-12 btn-bottom-nav px-3">
    <button
      class="btn btn-secondary rounded-5 w-100 fs-3 mb-1 p-3"
      on:click={() => goto("/create")}>Create</button
    >
  </div>
</div>

<style>
  ul {
    height: calc(
      100vh - 18.5rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }

  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
