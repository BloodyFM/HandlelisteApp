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
    console.log(data);
  });

  const submitHandler = async () => {
    console.log("onsubmit");
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

    console.log(data);

    await editHandleliste(data);
    goto("/detail/" + id, { replaceState: true });
  };

  //$: console.log(vareData);
  $: console.log($inputs);
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

<div>
  <h1>Edit Handleliste</h1>
  <form on:submit|preventDefault={submitHandler}>
    <label
      >Listenavn<input
        id="name"
        name="handleliste-name"
        bind:value={name}
      /></label
    >
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
      <Button type="submit">Save</Button>
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
