<script>
  export let id = "btn";
  export let type = "button";
</script>

<button {id} class="button" on:click {type}>
  <slot />
</button>

<style>
  .button {
    background-color: transparent;
    border: none;
    border-radius: 20px;
    color: var(--colorUI);
    cursor: pointer;
    margin: 0;
    padding: 0.2rem;
    text-transform: uppercase;
  }
  .button:hover {
    background-color: var(--colorNavInverse);
    color: var(--colorUIFocus);
  }
</style>
