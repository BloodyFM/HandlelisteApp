<script>
  import { addVareInstace } from "../../api/api";
  import { inputs } from "../../store/vare";
  export let data;
  export let handlelisteId;
  export let updateRecommendation;

  const addInput = (vareId, vareName, mengde) => {
    $inputs.push({
      vareId,
      vareName,
      mengde,
    });
    inputs.set($inputs);
  };

  const onClickhandler = async () => {
    addInput(data.vareId, data.vareName, 1);

    // add to the list
    const newInput = {
      vareId: $inputs[$inputs.length - 1].vareId,
      vareName: $inputs[$inputs.length - 1].vareName,
      mengde: 1,
      isCollected: false,
    };
    await addVareInstace(handlelisteId, newInput);
    await updateRecommendation();
  };
</script>

<button class="btn btn-primary fs-3 w-100" on:click={onClickhandler}
  >{"Anbefaling " + data.vareName}</button
>
