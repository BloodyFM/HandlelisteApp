<script>
  import { editVareInstance } from "../../api/api";
  export let handlelisteId = 0;
  export let id = 0;
  export let name = "";
  export let amount = 1;
  export let removeInput;
  export let lastEditedVare;

  const removeInputHandler = () => {
    // call delete api
    removeInput(id);
  };

  const amountBlurHandler = async () => {
    if (amount === null) amount = 1;

    await editVareInstance(handlelisteId, {
      vareId: id,
      vareName: name,
      mengde: amount,
      isCollected: false,
    });
  };
</script>

<li class="mt-1 d-flex">
  <div class="flex-fill bg-dark rounded-5 px-3">
    <p class="text-start fs-3 fw-bold my-2">{name}</p>
  </div>
  <input
    class="form-control bg-secondary border-secondary-subtle fs-3 rounded-5 custom-width mx-1"
    type="number"
    min="1"
    max="99"
    bind:value={amount}
    on:blur={amountBlurHandler}
    on:focus={() => (lastEditedVare = id)}
  />
  <button
    class="btn btn-secondary rounded-5 fs-3 custom-padding"
    on:click={removeInputHandler}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      class="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
      />
      <path
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
      />
    </svg>
  </button>
</li>

<style>
  .custom-width {
    max-width: 3.5rem;
  }
  .custom-padding {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  /* hide annoying number arrows */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
