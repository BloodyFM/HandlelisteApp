<script>
  import { setIsCollected } from "../../api/api";

  export let item = {};
  export let id = 0;
  let isCollected = item.isCollected;
  let liClass = "";

  const onClickHandler = async () => {
    isCollected = !isCollected;
    await setIsCollected(id, item.vareId, isCollected);
  };

  $: if (isCollected) liClass = "collected";
  else liClass = "";
</script>

<li
  class={`bg-secondary rounded-5 fs-1 fw-bold d-flex d-flex justify-content-between ps-3 mt-1 ${liClass}`}
  on:click={onClickHandler}
  on:keydown
>
  <h2 class="m-0 fs-1 fw-bold">{item.vareName}</h2>
  <div class="bg-primary rounded-5 px-3">
    <p class="m-0">{item.mengde}</p>
  </div>
</li>

<style>
  .collected {
    background-color: var(--colorNavInverse) !important;
  }
  .collected div {
    background-color: green !important;
  }
</style>
