<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { setIsCollected } from "../../api/api";

  export let item = {};
  export let id = 0;
  export let checkbox = null;
  export let showCollected = false;

  let isCollected = item.isCollected;
  let liClass = "";

  onMount(() => {
    if (isCollected) {
      checkCheckbox();
    }
  });

  const onClickHandler = async () => {
    isCollected = !isCollected;
    item.isCollected = isCollected;
    await setIsCollected(id, item.vareId, isCollected);
  };

  $: if (isCollected) {
    liClass = "collected";
  } else {
    liClass = "";
  }

  function checkCheckbox() {
    if (checkbox) checkbox.checked = true;
  }
</script>

{#if isCollected && !showCollected}
  <li
    transition:fade={{ duration: 150 }}
    class="fs-1 d-flex cursor-pointer ps-3"
    on:click={onClickHandler}
    on:keydown
  >
    <input
      id={`collectedCheck${item.vareId}`}
      type="checkbox"
      bind:checked={item.isCollected}
      class="rounded-1 form-check-input cursor-pointer custom-checkbox my-0"
    />
    <h2 class={`fs-3 my-0 ms-4 ${liClass}`}>{item.vareName}</h2>
    <p class="fs-3 text-secondary my-0 ms-auto me-3">{item.mengde}</p>
  </li>
{:else}
  <li
    class="fs-1 d-flex cursor-pointer ps-3"
    on:click={onClickHandler}
    on:keydown
  >
    <input
      id={`collectedCheck${item.vareId}`}
      type="checkbox"
      bind:checked={item.isCollected}
      class="rounded-1 form-check-input cursor-pointer custom-checkbox my-0"
    />
    <h2 class={`fs-3 my-0 ms-4 ${liClass}`}>{item.vareName}</h2>
    <p class="fs-3 text-secondary my-0 ms-auto me-3">{item.mengde}</p>
  </li>
{/if}

<style>
  .collected {
    text-decoration: line-through;
    color: var(--colorUIBlur);
  }

  .custom-checkbox:checked {
    background-color: var(--colorUISecondFocus);
    color: var(--colorUISecond);
    border-color: var(--colorUISecond);
  }
</style>
