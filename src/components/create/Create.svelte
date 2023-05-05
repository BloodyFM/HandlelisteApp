<script>
  import { goto } from "$app/navigation";
  import { createNewHandleliste, addVarer } from "../../api/api";
  import Button from "../UI/Button.svelte";
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

<div>
  <h1>Ny Handleliste</h1>
  <form on:submit|preventDefault={submitHandler}>
    <label>Listenavn<input id="name" name="handleliste-name" /></label>
    <h2>Varer</h2>
    <div class="add-btn">
      <Button on:click={addInputHandler}>+</Button>
    </div>
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
    <div class="exnav">
      <Button type="submit" id="btn-submit">Save</Button>
    </div>
  </form>
</div>

<style>
  h1,
  h2 {
    text-align: center;
    margin: 0.5rem;
  }
  label {
    color: var(--colorUI);
    display: flex;
    justify-content: center;
  }
  input {
    background-color: var(--colorNavInverse);
    border: 1px inset var(--colorNav);
    border-radius: 20px;
    color: var(--colorUI);
    margin-left: 0.3rem;
  }
  .exnav {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    bottom: 4rem;
    background-color: var(--colorNav);
  }
  ul {
    list-style: none;
    position: relative;
    margin: 0 0 6rem 0;
    padding: 0;
  }
  .add-btn {
    display: flex;
    justify-content: center;
  }
</style>
