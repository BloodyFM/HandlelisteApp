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
    editHandleliste,
    getSuggestedItem,
  } from "../../api/api";
  import VareInput from "./VareInput.svelte";
  import { key } from "../../store/auth";
  import BackButton from "../UI/BackButton.svelte";

  export let id = 0;
  export let vareData = {};
  let data = {};
  let name = "";
  let editName = false;
  let suggestedItem = null;

  let newVare = "";

  onMount(async () => {
    $inputs = [];
    data = await getDetailedHandleliste(id);
    name = data.handlelisteName;
    for (const { vareId, vareName, mengde } of data.varer) {
      addInput(vareId, vareName, mengde);
    }
    if ($inputs.length > 0) {
      suggestedItem = await getSuggestedItem(id);
    }
  });

  const addInput = (vareId, vareName, mengde) => {
    $inputs.push({
      vareId,
      vareName,
      mengde,
    });
    //this is the dumbest shiet, actually braindead
    inputs.set($inputs);
  };

  const submitHandler = async () => {
    if (newVare.trim().length === 0) return;
    // check if the item is already in inputs if so add 1
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

    // reset for new input
    newVare = "";
    // get suggested auto complete results
    console.log("hello?");
    suggestedItem = await getSuggestedItem(id);
  };

  const removeInput = async (vareId) => {
    for (let i = 0; i < $inputs.length; i++) {
      if ($inputs[i].vareId === vareId) {
        await deleteVareInstance(id, $inputs[i].vareId);
        $inputs.splice(i, 1);
        inputs.set($inputs);
        if ($inputs.length > 0) {
          suggestedItem = await getSuggestedItem(id);
        }
        break;
      }
    }
  };

  const submitListeNameHandler = async () => {
    await editHandleliste(id, {
      handlelisteId: id,
      userId: $key,
      handlelisteName: name,
    });
    editName = false;
  };

  let lastEditedVare = null;
  const onNavigateHandler = async () => {
    if (lastEditedVare) {
      for (const input of $inputs) {
        if (input.vareId === lastEditedVare) {
          await editVareInstance(id, {
            vareId: input.vareId,
            vareName: input.vareName,
            mengde: input.mengde,
            isCollected: false,
          });
          break;
        }
      }
    }
    goto(`/detail/${id}`);
  };
</script>

<div class="row m-0">
  <div class="col-12 text-center">
    {#if !editName}
      <h1 class="my-5">
        {name}
        <button
          class="btn btn-primary rounded-1"
          on:click={() => (editName = true)}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg></button
        >
      </h1>
    {:else}
      <form on:submit|preventDefault={submitListeNameHandler}>
        <div class="form-floating my-5 mx-5">
          <input
            class="form-control rounded-1 border-primary"
            type="text"
            id="name"
            bind:value={name}
            required
            placeholder="Listenavn"
          />
          <label class="form-label text-secondary" for="name">Listenavn</label>
        </div>
      </form>
    {/if}
    <h2 class="fs-1 mb-3">Legg til varer</h2>
    <form on:submit|preventDefault={submitHandler}>
      <div class="form-floating">
        <input
          class="form-control rounded-1 border-primary"
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

    <ul class="p-0 mt-3">
      {#if $inputs.length === 0}
        <p class="mt-1">Det er ingen varer i listen. Legg til noen.</p>
      {/if}
      {#each $inputs as input}
        <VareInput
          bind:lastEditedVare
          handlelisteId={id}
          id={input.vareId}
          name={input.vareName}
          bind:amount={input.mengde}
          {removeInput}
        />
        {#if input != $inputs[$inputs.length - 1]}
          <hr />
        {/if}
      {/each}
    </ul>
  </div>
  <div class="col-12 btn-bottom-nav px-3">
    <button
      on:click={onNavigateHandler}
      class="btn btn-secondary rounded-1 w-100 fs-3 mb-1 p-3">Done</button
    >
  </div>
</div>
<BackButton onClick={onNavigateHandler} />

<style>
  ul {
    height: calc(
      100vh - 26.8rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }
  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
