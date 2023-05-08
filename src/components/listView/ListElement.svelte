<script>
  import Button from "../UI/Button.svelte";
  import { deleteHandleliste, cloneHandleliste } from "../../api/api";
  import { handlelister } from "../../store/handleliste";
  import Modal from "../UI/Modal.svelte";

  export let id;
  export let title;

  const cloneHandler = async () => {
    var clonedList = await cloneHandleliste(id);
    addElement(clonedList.handlelisteId, title + " clone");
  };

  const addElement = (id, name) => {
    var l = $handlelister.length;
    $handlelister[l] = { id, name };
  };

  const deleteHandler = async () => {
    await deleteHandleliste(id);
    removeElement();
  };

  const removeElement = () => {
    $handlelister = $handlelister.filter((list) => {
      if (list.id != id) return list;
    });
  };

  let showModal = false;
</script>

<li class="row bg-secondary rounded-5 fs-1 fw-bold mt-1">
  <a class="col-6 text-start text-decoration-none" href={"/detail/" + id}
    >{title}</a
  >
  <button
    class="col-3 btn btn-primary rounded-5 fs-3 fw-bold"
    on:click={cloneHandler}>Clone</button
  >
  <button
    class="col-3 btn btn-primary rounded-5 fs-3 fw-bold"
    on:click={() => (showModal = true)}>Delete</button
  >
</li>

<Modal bind:showModal>
  <p>Er du siker på at du vil slette handlelisten?</p>
  <Button on:click={deleteHandler}>Delete</Button>
  <Button on:click={() => (showModal = false)}>Cancel</Button>
</Modal>

<style>
</style>
