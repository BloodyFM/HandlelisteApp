<script>
  import { getHandlelister } from "../../api/api";
  import ListElement from "./ListElement.svelte";
  import { onMount } from "svelte";
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

<ul>
  {#if dataLoaded && data.length > 0}
    {#each $handlelister as item}
      <ListElement id={item.id} title={item.name} />
    {/each}
  {:else if dataLoaded}
    <p>Ingen lister funnet</p>
  {:else}
    <p>loading...</p>
  {/if}
</ul>

<style>
</style>
