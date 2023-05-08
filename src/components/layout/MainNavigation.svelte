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
    create = url == "/create" ? "active-route" : "";
  }
  $: {
    listview = url == "/" ? "active-route" : "";
  }
</script>

<header class="container-fluid container-max-width bg-black">
  <nav>
    <ul class="row">
      <li class="col ${create}">
        <a href="/create">
          <p>+</p>
        </a>
      </li>
      <li class="col ${listview}">
        <a href="/">
          <p>Lister</p>
        </a>
      </li>
      <li class="col">
        <button class="btn btn-primary" on:click={onLogoutHandler}>
          <p>Logout</p>
        </button>
      </li>
    </ul>
  </nav>
</header>

<style>
  .container-max-width {
    max-width: 800px;
  }
</style>
