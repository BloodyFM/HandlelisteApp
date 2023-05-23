<script>
  import { fade, fly } from "svelte/transition";
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
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="modal"
    id="modalComponent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalComponentLabel"
    aria-hidden={false}
    on:click={modalCloseHandler}
  >
    <div
      class="modal-dialog"
      role="document"
      on:click|stopPropagation
      in:fly={{ y: -50, duration: 300 }}
      out:fly={{ y: -50, duration: 300 }}
    >
      <div class="modal-content rounded-4 bg-body">
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
        <div class="modal-footer d-flex">
          <button
            type="button"
            class="btn btn-primary rounded-4 flex-fill"
            data-dismiss="modal"
            on:click={modalCloseHandler}>Close</button
          >
          <button
            type="button"
            class="btn btn-secondary rounded-4 flex-fill"
            on:click={() => {
              if (onConfirm) onConfirm();
            }}>Confirm</button
          >
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
  {/if}
{/if}

<style>
  .modal {
    display: block;
  }
</style>
