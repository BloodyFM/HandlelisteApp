<script>
  export let isChecked = false;
  export let isCheckedLabel = "";
  export let id = "check";
</script>

<div class="mb-3 form-check pos">
  <input type="checkbox" bind:checked={isChecked} id class="form-check-input" />
  <label for={id} class="form-check-label">{isCheckedLabel}</label>
</div>

<style>
  .pos {
    position: absolute;
    right: 1rem;
  }
</style>
