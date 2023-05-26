<script>
  export let isChecked = false;
  export let isCheckedLabel = "";
  export let id = "check";
</script>

<div class="form-check form-switch">
  <input
    type="checkbox"
    role="switch"
    bind:checked={isChecked}
    id
    class="form-check-input custom-color"
  />
  <label for={id} class="form-check-label">{isCheckedLabel}</label>
</div>

<style>
  .custom-color:checked {
    background-color: var(--colorUISecondFocus) !important;
    border-color: var(--colorUISecond);
  }
</style>
