<script>
  import { onMount, afterUpdate } from "svelte";
  import { getDetailedHandleliste } from "../../api/api";
  import DetailItems from "./DetailItems.svelte";
  import { goto } from "$app/navigation";
  import BackButton from "../UI/BackButton.svelte";
  import CheckToggleButton from "../UI/CheckToggleButton.svelte";

  export let id = 0;

  let data = {};
  let checkboxes = [];
  let hrTags = [];
  onMount(async () => {
    data = await getDetailedHandleliste(id);
    updateDocument();
  });

  afterUpdate(() => {
    updateDocument();
  });

  const updateDocument = () => {
    checkboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    );
    trimBottomHr();
  };

  const trimBottomHr = () => {
    hrTags = document.getElementsByTagName("hr");
    // only if there is to many hrTags
    if (hrTags.length > 0 && checkboxes.length - 1 <= hrTags.length) {
      // Get the last <hr/> tag
      const lastHrTag = hrTags[hrTags.length - 1];
      // Remove the last <hr/> tag
      lastHrTag.parentNode.removeChild(lastHrTag);
    }
  };

  let showCollected = true;
</script>

{#if data.handlelisteName}
  <div class="row m-0">
    <h1 class="col-12 text-center my-5">{data.handlelisteName}</h1>
    <div class="col-12">
      <ul class="px-1">
        {#each data.varer as item, i}
          {#if showCollected}
            <DetailItems bind:item {id} bind:checkbox={checkboxes[i]} />
            <hr />
          {:else if !showCollected && !item.isCollected}
            <DetailItems bind:item {id} bind:checkbox={checkboxes[i]} />
            <hr />
          {/if}
        {/each}
      </ul>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <CheckToggleButton
        bind:isChecked={showCollected}
        isCheckedLabel="Vis skjulte varer"
      />
    </div>
    <div class="col-12 btn-bottom-nav px-3">
      <button
        class="btn btn-secondary rounded-1 w-100 fs-3 mb-1 p-3"
        on:click={() => goto("/edit/" + id)}>Edit</button
      >
    </div>
  </div>
{:else}
  <p class="text-center fs-1">loading...</p>
{/if}
<BackButton onClick={() => goto("/")} />

<style>
  ul {
    height: calc(
      100vh - 20rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }

  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
