<script>
  import { onMount } from "svelte";
  import { getDetailedHandleliste } from "../../api/api";
  import DetailItems from "./DetailItems.svelte";
  import Button from "../UI/Button.svelte";
  import { goto } from "$app/navigation";

  export let id = 0;

  let data = {};
  onMount(async () => {
    data = await getDetailedHandleliste(id);
  });
</script>

{#if data.handlelisteName}
  <div class="detail">
    <h1>{data.handlelisteName}</h1>
    <ul>
      {#each data.varer as item}
        <DetailItems {item} {id} />
      {/each}
    </ul>
  </div>
  <div class="exnav">
    <Button on:click={() => goto("/edit/" + id)}>Edit</Button>
  </div>
{:else}
  <p>loading...</p>
{/if}

<style>
  .detail {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  h1 {
    margin: 0;
    text-align: center;
  }
  ul {
    list-style: none;
    position: relative;
    margin: 0 0 6rem 0;
    padding: 0;
  }
  .exnav {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 4rem;
    background-color: var(--colorNav);
  }
</style>
