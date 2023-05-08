<script>
  import { page } from "$app/stores";
  import { key } from "../../store/auth";
  import { goto } from "$app/navigation";

  const onLogoutHandler = () => {
    key.set("");
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
</script>

<header>
  <nav class="navbar navbar-expand navbar-dark fixed-bottom bg-nav-custom">
    <div class="container-fluid container-max-width py-0 px-3">
      <ul class="nav navbar-nav w-100 d-flex">
        <li class="nav-item flex-fill">
          <a
            class={`nav-link rounded-5 fs-3 fw-bold text-center bg-primary ${create}`}
            href="/create"
          >
            +
          </a>
        </li>
        <li class="nav-item flex-fill mx-2">
          <a
            class={`nav-link rounded-5 fs-3 fw-bold text-center bg-primary ${listview}`}
            href="/"
          >
            Lister
          </a>
        </li>
        <li class="nav-item flex-fill d-flex">
          <button
            class="nav-link rounded-5 fs-3 fw-bold flex-fill bg-primary flex-fill"
            on:click={onLogoutHandler}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</header>

<style>
  .container-max-width {
    max-width: 800px;
  }
  .bg-nav-custom {
    background-color: var(--colorNav);
  }
</style>
