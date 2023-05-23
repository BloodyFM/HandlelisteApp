<script>
  import { logoutCtx } from "../../store/auth";
  import { goto } from "$app/navigation";
  import Modal from "../UI/Modal.svelte";

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
    class="navbar navbar-expand navbar-dark fixed-bottom mx-auto"
    style="max-width: 800px;"
  >
    <div class="container-fluid container-max-width py-0 px-3">
      <ul class="nav navbar-nav w-100 d-flex">
        <li class="nav-item flex-fill mx-2">
          <a
            class="nav-link fs-3 text-center text-secondary border-custom"
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
  onClose={onCloseModal}><p>Are you sure you want to log out?</p></Modal
>

<style>
  .container-max-width {
    max-width: 800px;
  }
</style>
