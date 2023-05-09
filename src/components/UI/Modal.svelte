<script>
  export let showModal;
  export let showBackdrop = true;
  export let onClose;
  export let onConfirm;
  export let title = null;

  const modalCloseHandler = () => {
    showModal = false;
    if (onClose) onClose();
  };
</script>

{#if showModal}
  <div
    class="modal"
    id="modalComponent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalComponentLabel"
    aria-hidden={false}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-5 bg-modal-custom">
        <div class="modal-header">
          {#if title}
            <h5 class="modal-title text-secondary" id="modalComponentLabel">
              {title}
            </h5>
          {/if}
          <button
            type="button"
            class="close btn ms-auto text-secondary"
            data-dismiss="modal"
            aria-label="Close"
            on:click={modalCloseHandler}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            on:click={modalCloseHandler}>Close</button
          >
          <button
            type="button"
            class="btn btn-primary"
            on:click={() => {
              if (onConfirm) onConfirm();
            }}>Confirm</button
          >
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .modal {
    display: block;
  }
  .bg-modal-custom {
    background-color: var(--colorNav);
  }
</style>
