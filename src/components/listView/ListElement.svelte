<script>
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
  const onModalClose = () => {
    showModal = false;
  };
</script>

<li class="fs-1 d-flex align-items-center">
  <a class="text-start text-decoration-none flex-grow-1" href={"/detail/" + id}
    >{title}</a
  >
  <div class="dropdown ms-auto">
    <a
      class="dropdown-toggle text-secondary cursor-pointer text-decoration-none no-caret no-select"
      id="nav-dropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false">&gt;</a
    >
    <ul class="custom-width dropdown-menu p-0" aria-labelledby="nav-dropdown">
      <li>
        <button class="btn btn-primary fs-3 w-100" on:click={cloneHandler}
          >Clone</button
        >
      </li>
      <li>
        <button
          class="btn btn-primary fs-3 w-100"
          on:click={() => (showModal = true)}>Delete</button
        >
      </li>
    </ul>
  </div>
</li>

<Modal
  {showModal}
  onClose={onModalClose}
  onConfirm={deleteHandler}
  title="Slett liste?"
>
  <p>Er du siker på at du vil slette handlelisten?</p>
</Modal>

<style>
  .no-caret::after {
    display: none;
  }
  .custom-width {
    width: 5rem;
  }
</style>
