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

<li>
  <a href={"/detail/" + id}>{title}</a>
  <Button on:click={cloneHandler}>Clone</Button>
  <Button on:click={() => (showModal = true)}>Delete</Button>
</li>

<Modal bind:showModal>
  <p>Er du siker på at du vil slette handlelisten?</p>
  <Button on:click={deleteHandler}>Delete</Button>
  <Button on:click={() => (showModal = false)}>Cancel</Button>
</Modal>

<style>
  li {
    display: flex;
    justify-content: right;
    background-color: var(--colorNav);
    margin: 1px;
    border-radius: 20px;
  }

  li:hover {
    background-color: var(--colorBG);
  }

  li a {
    width: 100%;
    text-align: left;
    text-decoration: none;
    padding: 0.2rem;
  }

  li a:hover {
    color: var(--colorUIFocus);
  }
</style>
