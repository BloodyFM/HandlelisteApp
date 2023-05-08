<script>
  import { goto } from "$app/navigation";
  import { createNewHandleliste, addVarer } from "../../api/api";
  import VareInput from "./VareInput.svelte";
  import { inputs, nrInputs } from "../../store/vare";
  import { key } from "../../store/auth";

  export let vareData = {};

  const submitHandler = async (event) => {
    document.getElementById("btn-submit").disabled = true;
    const formData = new FormData(event.target);
    let newVarer = []; // for pushing new Varer
    let listVarer = []; // for the list as a whole

    for (let i = 0; i < $inputs.length; i++) {
      for (let j = i + 1; j < $inputs.length; j++) {
        if ($inputs[i].vareName.trim() === $inputs[j].vareName.trim()) {
          // console.log(
          //   `Merging ${$inputs[i].vareName} adding ${$inputs[j].amount}`
          // );
          $inputs[i].amount += $inputs[j].amount;
          $inputs.splice(j, 1);
          j--; // since the array is now shorter we need to make sure we dont skip a spot
        }
      }
    }

    for (let i = 0; i < $inputs.length; i++) {
      let isNew = true;
      for (let v = 0; v < vareData.length; v++) {
        if ($inputs[i].vareName === vareData[v].vareName) isNew = false;
      }
      const inputtedVare = {
        vareId: 0, // to be assigned
        vareName: $inputs[i].vareName.trim(),
        isDeleted: false,
        mengde: $inputs[i].amount,
      };
      //console.log($inputs[i].amount);

      if (isNew && $inputs[i].vareName.trim() != "") {
        //console.log($inputs[i].vareName + " is new!");
        newVarer.push(inputtedVare);
      }
      if ($inputs[i].vareName.trim() != "") {
        listVarer.push(inputtedVare);
      }
    }
    // here we post the new vare articles
    var newlyCreatedVarer = await addVarer(newVarer);
    vareData = [...vareData, ...newlyCreatedVarer];
    // need to assign the id's now that I have all Vare data from database
    // thought filter a better way of looking for the correct article when I know it exists
    for (var i = 0; i < listVarer.length; i++) {
      var vare = vareData.filter(
        (vare) => vare.vareName === listVarer[i].vareName
      )[0]; // this always return an array even when there is only one result
      if (vare) listVarer[i].vareId = vare.vareId;
    }

    const listeData = {
      handlelisteId: 0,
      userId: $key,
      handlelisteName: formData.get("handleliste-name"),
      varer: listVarer,
    };
    //console.log(listeData);

    await createNewHandleliste(listeData);
    goto("/", { replaceState: true });
  };

  //$: console.log(vareData);
  $inputs = [{ id: 0, vareName: "", amount: 1 }];
  //$nrInputs.set(1);

  const addInputHandler = () => {
    var l = $inputs.length;
    $inputs[l] = { id: $nrInputs, vareName: "", amount: 1 };
    $nrInputs++;
  };
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="row m-0">
    <div class="col-12 text-center">
      <h1 class="fw-bold fs-1 my-3">Ny Handleliste</h1>
      <div class="form-floating">
        <input
          class="form-control rounded-5 bg-secondary border-secondary-subtle"
          id="name"
          name="handleliste-name"
          required
          placeholder="Name"
        />
        <label class="form-label" for="name">Listenavn</label>
      </div>
      <h2 class="fw-bold fs-1 my-3">Varer</h2>
      <button
        class="btn btn-primary rounded-5 w-100"
        type="button"
        on:click={addInputHandler}>+</button
      >
      <ul>
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
    <div class="col-12 btn-bottom-nav bg-black px-3">
      <button
        class="btn btn-primary rounded-5 w-100 fs-3 fw-bold mb-2"
        type="submit"
        id="btn-submit">Save</button
      >
    </div>
  </div>
</form>

<style>
  ul {
    max-height: calc(
      100vh - 24.6rem
    ); /* adjust the value to account for the height of your nav bar */
    overflow-y: auto;
  }
  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
