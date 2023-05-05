<script>
  export let showModal;

  // HTMLDialogElement
  let dialog;

  $: if (dialog && showModal) dialog.showModal();
  $: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <div on:click|stopPropagation>
    <slot />
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 20px;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1rem;
    background-color: var(--colorBg);
  }
  dialog[open] {
    animation: zoom 0.3s ease-out;
  }
  @keyframes zoom {
    from {
      transform: scale(0.5) translate(0%, 300%);
    }
    to {
      transform: scale(1) translate(0%, 0%);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
