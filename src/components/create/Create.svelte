<script>
  import { goto } from "$app/navigation";
  import { createNewHandleliste } from "../../api/api";
  import { key } from "../../store/auth";
  import BackButton from "../UI/BackButton.svelte";

  let name = "";

  const submitHandler = async () => {
    if (name.trim().length > 0) {
      const { handlelisteId } = await createNewHandleliste({
        handlelisteId: 0,
        userId: $key,
        handlelisteName: name.trim(),
      });
      goto(`/edit/${handlelisteId}`, { replaceState: true });
    }
  };
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="row m-0">
    <div class="col-12 text-center">
      <h1 class="fs-1 my-5">Ny Handleliste</h1>
      <div class="form-floating">
        <input
          class="form-control rounded-4 border-primary"
          type="text"
          id="name"
          bind:value={name}
          required
          placeholder="Name"
        />
        <label class="form-label text-secondary" for="name">Listenavn</label>
      </div>
    </div>
    <div class="col-12 btn-bottom-nav px-3">
      <button
        class="btn btn-secondary rounded-5 w-100 fs-3 mb-1 p-3"
        type="submit"
        id="btn-submit">Save</button
      >
    </div>
  </div>
</form>
<BackButton onClick={() => goto("/")} />

<style>
  .btn-bottom-nav {
    position: fixed;
    bottom: 4.1rem;
    max-width: 800px;
  }
</style>
