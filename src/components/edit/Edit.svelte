<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { inputs } from "../../store/vare";
  import {
    getDetailedHandleliste,
    addVare,
    addVareInstace,
    deleteVareInstance,
    editVareInstance,
  } from "../../api/api";
  import VareInput from "./VareInput.svelte";

  export let id = 0;
  export let vareData = {};
  let data = {};
  let name = "";

  let newVare = "";

  onMount(async () => {
    $inputs = [];
    data = await getDetailedHandleliste(id);
    name = data.handlelisteName;
    for (const { vareId, vareName, mengde } of data.varer) {
      addInput(vareId, vareName, mengde);
    }
  });

  const addInput = (vareId, vareName, mengde) => {
    $inputs.push({
      vareId,
      vareName,
      mengde,
    });
    console.log({ vareId, vareName });
    //this is the dumbest shiet, actually braindead
    inputs.set($inputs);
  };

  const submitHandler = async () => {
    if (newVare.trim().length === 0) return;
    // check if the item is already in inputs if so add 1
    // ... code here
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs[i].vareName === newVare) {
        $inputs[i].mengde++;
        await editVareInstance(id, {
          vareId: $inputs[i].vareId,
          vareName: $inputs[i].vareName,
          mengde: $inputs[i].mengde,
          isCollected: false,
        });
        newVare = "";
        return;
      }
    }

    // if the item is not already in inputs
    // 1. see if the items already on the server
    let isNew = true;
    let newInput;
    for (const vare of vareData) {
      if (vare.vareName === newVare) {
        addInput(vare.vareId, vare.vareName, 1);
        newVare = "";
        isNew = false;
        break;
      }
    }

    // 2. if not add to the database then use the return data in addInput
    if (isNew) {
      const newData = await addVare({
        vareId: 0,
        vareName: newVare,
      });
      vareData.push(newData);
      addInput(newData.vareId, newData.vareName, 1);
    }

    // add to the list
    newInput = {
      vareId: $inputs[$inputs.length - 1].vareId,
      vareName: $inputs[$inputs.length - 1].vareName,
      mengde: 1,
      isCollected: false,
    };
    await addVareInstace(id, newInput);

    //reset for new input
    newVare = "";
  };

  $: console.log($inputs);
  $: console.log(vareData);
  //goto("/detail/" + id, { replaceState: true });

  const removeInput = async (vareId) => {
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs[i].vareId === vareId) {
        await deleteVareInstance(id, $inputs[i].vareId);
        $inputs.splice(i, 1);
        inputs.set($inputs);
        break;
      }
    }
  };
</script>

<div class="row m-0">
  <div class="col-12 text-center">
    <h1 class="fw-bold fs-1 my-3">{name}</h1>
    <h2 class="fw-bold fs-1 my-3">Legg til varer</h2>
    <form on:submit|preventDefault={submitHandler}>
      <div class="form-floating">
        <input
          class="form-control rounded-5 bg-secondary border-secondary-subtle"
          type="text"
          list="varer-selection"
          id="newVare"
          bind:value={newVare}
          required
          placeholder="newVare"
        />
        <label class="form-label text-secondary" for="newVare">Vare</label>
      </div>
      <datalist id="varer-selection">
        {#if vareData != null}
          {#each vareData as vare}
            <option value={vare.vareName} />
          {/each}
        {/if}
      </datalist>
    </form>

    <ul class="p-0">
      {#if $inputs.length === 0}
        <p>Det er ingen varer i listen. Legg til noen.</p>
      {/if}
      {#each $inputs as input}
        <VareInput
          handlelisteId={id}
          id={input.vareId}
          name={input.vareName}
          bind:amount={input.mengde}
          {removeInput}
        />
      {/each}
    </ul>
  </div>
  <div class="col-12 btn-bottom-nav bg-dark pt-2 px-3 rounded-top-5">
    <button
      on:click={() => goto(`/detail/${id}`)}
      class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-3">Done</button
    >
  </div>
</div>

<style>
  ul {
    max-height: calc(
      100vh - 27.1rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }
  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
