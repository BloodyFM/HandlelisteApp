<script>
  import { inputs, nrInputs } from "../../store/vare";
  import { addVarer } from "../../api/api";

  export let vareData = null;
  export let value = "";
  export let vareId = 0;
  export let id = 0;
  export let amount = 1;

  const removeInput = () => {
    $inputs = $inputs.filter((input) => {
      if (input.id != id) return input;
    });
  };

  const blurHandler = async () => {
    if (value.trim() === "") return;
    let isNew = true;
    for (const vare of vareData) {
      if (value.trim() === vare.vareName) isNew = false;
    }
    if (isNew) {
      const newlyCreatedVare = await addVarer([
        {
          vareId: 0,
          vareName: value.trim(),
        },
      ]);
      vareId = newlyCreatedVare[0].vareId;
      console.log(vareId);
      $inputs[id] = { id, vareId, vareName: value, amount };
      vareData = [...vareData, ...newlyCreatedVare];
    } else {
      for (const vare of vareData) {
        if (value.trim() === vare.vareName) vareId = vare.vareId;
      }
    }
  };

  const amountBlurHandler = () => {
    if (amount === null) amount = 1;
  };
</script>

<li class="mt-1 d-flex">
  <input
    class="form-control bg-secondary border-secondary-subtle fs-3 rounded-5"
    type="text"
    list="varer-selection"
    name={"varer" + id}
    bind:value
    on:blur={blurHandler}
  />
  <datalist id="varer-selection">
    {#if vareData != null}
      {#each vareData as vare}
        <option value={vare.vareName} />
      {/each}
    {/if}
  </datalist>
  <input
    class="form-control bg-secondary border-secondary-subtle fs-3 rounded-5 custom-width mx-1"
    type="number"
    name={"varer-mengde" + id}
    min="1"
    max="99"
    bind:value={amount}
    on:blur={amountBlurHandler}
  />
  <button
    class="btn btn-secondary rounded-5 fs-3 custom-padding"
    on:click={removeInput}>-</button
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
