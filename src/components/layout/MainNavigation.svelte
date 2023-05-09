<script>
  import { page } from "$app/stores";
  import { logoutCtx } from "../../store/auth";
  import { goto } from "$app/navigation";
  import Modal from "../UI/Modal.svelte";

  const onLogoutHandler = () => {
    logoutCtx();
    goto("/auth");
  };

  let url = ``;
  $: {
    url = $page.url.pathname;
  }
  let create = "";
  let listview = "";
  $: {
    create = url == "/create" ? "active" : "";
  }
  $: {
    listview = url == "/" ? "active" : "";
  }

  const onCloseModal = () => {
    showModal = false;
  };

  let showModal = false;
</script>

<header>
  <nav class="navbar navbar-expand navbar-dark fixed-bottom bg-dark">
    <div class="container-fluid container-max-width py-0 px-3">
      <ul class="nav navbar-nav w-100 d-flex">
        <li class="nav-item flex-fill">
          <a
            class={`nav-link rounded-5 fs-3 fw-bold text-center bg-primary border-custom ${create}`}
            href="/create"
          >
            +
          </a>
        </li>
        <li class="nav-item flex-fill mx-2">
          <a
            class={`nav-link rounded-5 fs-3 fw-bold text-center bg-primary border-custom ${listview}`}
            href="/"
          >
            Lister
          </a>
        </li>
        <li class="nav-item flex-fill d-flex">
          <button
            class="nav-link rounded-5 fs-3 fw-bold flex-fill bg-primary border-custom flex-fill"
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
  onClose={onCloseModal}><p>Are you sure you want to log out?</p></Modal
>

<style>
  .container-max-width {
    max-width: 800px;
  }
  .border-custom {
    border: 5px solid var(--colorNav);
  }
  .border-custom:hover {
    border-color: var(--colorBg);
  }
</style>
