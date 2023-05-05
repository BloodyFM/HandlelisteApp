<script>
  import { inputs } from "../../store/vare";
  import Button from "../UI/Button.svelte";
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
      vareId = newlyCreatedVare.vareId;
      vareData = [...vareData, ...newlyCreatedVare];
    } else {
      for (const vare of vareData) {
        if (value.trim() === vare.vareName) vareId = vare.vareId;
      }
    }
    console.log("onBlur");
  };

  const amountBlurHandler = () => {
    if (amount === null) amount = 1;
  };
</script>

<li>
  <input
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
    class="vare-mengde"
    type="number"
    name={"varer-mengde" + id}
    min="1"
    bind:value={amount}
    on:blur={amountBlurHandler}
  />
  <Button on:click={removeInput}>-</Button>
</li>

<style>
  li {
    display: flex;
    justify-content: center;
  }
  input {
    background-color: var(--colorNavInverse);
    border: 1px inset var(--colorNav);
    border-radius: 20px;
    color: var(--colorUI);
  }
  .vare-mengde {
    width: 2rem;
  }
</style>
