<script>
  import { editVareInstance } from "../../api/api";
  export let handlelisteId = 0;
  export let id = 0;
  export let name = "";
  export let amount = 1;
  export let removeInput;

  const removeInputHandler = () => {
    // call delete api
    console.log("delete " + id + " from " + handlelisteId);
    removeInput(id);
  };

  const amountBlurHandler = async () => {
    if (amount === null) amount = 1;
    //do stuff
    await editVareInstance(handlelisteId, {
      vareId: id,
      vareName: name,
      mengde: amount,
      isCollected: false,
    });
  };
</script>

<li class="mt-1 d-flex">
  <p>{name}</p>
  <input
    class="form-control bg-secondary border-secondary-subtle fs-3 rounded-5 custom-width mx-1"
    type="number"
    min="1"
    max="99"
    bind:value={amount}
    on:blur={amountBlurHandler}
  />
  <button
    class="btn btn-secondary rounded-5 fs-3 custom-padding"
    on:click={removeInputHandler}>-</button
  >
</li>

<style>
  .custom-width {
    max-width: 3.5rem;
  }
  .custom-padding {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
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
