<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getDetailedHandleliste, editHandleliste } from "../../api/api";
  import Button from "../UI/Button.svelte";
  import { inputs, nrInputs } from "../../store/vare";
  import VareInput from "../create/VareInput.svelte";

  export let id = 0;
  export let vareData = {};
  let name = "";
  let data = {};
  onMount(async () => {
    data = await getDetailedHandleliste(id);
    name = data.handlelisteName;
    for (const { vareId, vareName, mengde } of data.varer) {
      addInput(vareId, vareName, mengde);
    }
    //console.log(data);
  });

  const submitHandler = async () => {
    document.getElementById("btn-submit").disabled = true;
    //console.log("onsubmit");
    data.handlelisteName = name;
    let newVarer = []; // for pushing new Varer

    for (let i = 0; i < $inputs.length; i++) {
      for (let j = i + 1; j < $inputs.length; j++) {
        if ($inputs[i].vareName.trim() === $inputs[j].vareName.trim()) {
          console.log(
            `Merging ${$inputs[i].vareName} adding ${$inputs[j].amount}`
          );
          $inputs[i].amount += $inputs[j].amount;
          $inputs.splice(j, 1);
          j--; // since the array is now shorter we need to make sure we dont skip a spot
        }
      }
    }

    // here comes the big task
    // it is imperative that the original items go first and in order all new items most go after
    // additionally deleted items must be present but with the is deleted property set to true
    for (let i = 0; i < $inputs.length; i++) {
      // update the values already in the list then create new to add the the back

      // remove empty inputs
      if ($inputs[i].vareName === "") {
        $inputs.splice(i, 1);
        i--;
        continue;
      }

      let inOriginalList = false;
      for (const vare of data.varer) {
        if (vare.vareName === $inputs[i].vareName.trim()) {
          inOriginalList = true;
          vare.mengde = $inputs[i].amount;
        }
      }
      if (!inOriginalList) {
        newVarer.push({
          vareId: $inputs[i].vareId,
          vareName: $inputs[i].vareName,
          mengde: $inputs[i].amount,
          isDeleted: false,
        });
      }
    }
    for (const vare of data.varer) {
      // check for deleted varer
      let deleted = true;
      for (let i = 0; i < $inputs.length; i++) {
        if (vare.vareId === $inputs[i].vareId) deleted = false;
      }
      vare.isDeleted = deleted;
    }

    //put new varer in the back (important for the api to work)
    data.varer = [...data.varer, ...newVarer];

    //console.log(data);

    await editHandleliste(data);
    goto("/detail/" + id, { replaceState: true });
  };

  //$: console.log(vareData);
  //$: console.log($inputs);
  $inputs = [];
  $nrInputs = 0;

  const addInputHandler = () => {
    addInput();
  };
  const addInput = (vareId = 0, vareName = "", amount = 1) => {
    var l = $inputs.length;
    $inputs[l] = { id: $nrInputs, vareId, vareName, amount };
    $nrInputs++;
  };
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="row m-0">
    <div class="col-12 text-center">
      <h1 class="fw-bold fs-1 my-3">Edit Handleliste</h1>
      <div class="form-floating">
        <input
          class="form-control rounded-5 bg-secondary border-secondary-subtle"
          type="text"
          id="name"
          bind:value={name}
          required
          placeholder="Name"
        />
        <label class="form-label text-secondary" for="name">Listenavn</label>
      </div>
      <h2 class="fw-bold fs-1 my-3">Varer</h2>
      <button
        class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-1"
        type="button"
        on:click={addInputHandler}>+</button
      >
      <ul class="p-0">
        {#each { length: $inputs.length } as _, index}
          {@const reverseIndex = $inputs.length - 1 - index}
          <VareInput
            bind:vareData
            bind:vareId={$inputs[reverseIndex].vareId}
            id={$inputs[reverseIndex].id}
            bind:value={$inputs[reverseIndex].vareName}
            bind:amount={$inputs[reverseIndex].amount}
          />
        {/each}
      </ul>
    </div>
    <div class="col-12 btn-bottom-nav bg-nav-custom pt-2 px-3">
      <button
        class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-3"
        type="submit"
        id="btn-submit">Save</button
      >
    </div>
  </div>
</form>

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
  .bg-nav-custom {
    background-color: var(--colorNav);
  }
</style>
