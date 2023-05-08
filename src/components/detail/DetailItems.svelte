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
  class={`row bg-secondary rounded-5 fs-1 fw-bold ${liClass}`}
  on:click={onClickHandler}
  on:keydown
>
  <h2>{item.vareName}</h2>
  <div>
    <p>{item.mengde}</p>
  </div>
</li>

<style>
  li {
    display: flex;
    justify-content: space-between;
    background-color: var(--colorNav);
    border-radius: 20px;
    padding-left: 0.5rem;
    margin: 1px;
  }
  .collected {
    background-color: green;
  }
  h2,
  p {
    font-size: 1.5rem;
    margin: 0;
  }
  div {
    text-align: center;
    background-color: var(--colorNavInverse);
    border-radius: 20px;
    width: auto;
    padding: 0 0.5rem;
  }
</style>
