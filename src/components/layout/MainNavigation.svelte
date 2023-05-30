<script>
  import { logoutCtx } from "../../store/auth";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Modal from "../UI/Modal.svelte";

  let currentPath;
  let active = false;
  $: currentPath = $page.url.pathname;
  $: active = currentPath === "/" ? "active" : "";

  const onLogoutHandler = () => {
    logoutCtx();
    goto("/auth");
  };

  const onCloseModal = () => {
    showModal = false;
  };

  let showModal = false;
</script>

<header>
  <nav
    class="navbar navbar-expand fixed-bottom mx-auto"
    style="max-width: 800px;"
  >
    <div class="container-fluid container-max-width py-0 px-3">
      <ul class="nav navbar-nav w-100 d-flex">
        <li class="nav-item flex-fill mx-2">
          <a
            class={`nav-link fs-3 text-center text-secondary border-custom ${active}`}
            href="/"
          >
            Lister
          </a>
        </li>
        <li class="nav-item flex-fill d-flex">
          <button
            class="nav-link fs-3 flex-fill text-secondary border-custom flex-fill"
            on:click={() => (showModal = true)}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</header>

<Modal
  title="Logout?"
  {showModal}
  onConfirm={onLogoutHandler}
  onClose={onCloseModal}><p>Er du sikker på at du vil logge ut?</p></Modal
>

<style>
  .container-max-width {
    max-width: 800px;
  }

  .active {
    color: black !important;
  }
</style>
