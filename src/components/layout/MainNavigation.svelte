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

<header>
  <nav>
    <ul>
      <li class={create}>
        <a href="/create">
          <p>+</p>
        </a>
      </li>
      <li class={listview}>
        <a href="/">
          <p>Lister</p>
        </a>
      </li>
      <li>
        <button on:click={onLogoutHandler}>
          <p>Logout</p>
        </button>
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: 4rem;
    background-color: var(--colorNav);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
  }

  header nav {
    height: inherit;
    width: 100%;
  }

  header ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    width: inherit;
    height: inherit;
  }

  header li {
    display: flex;
    width: inherit;
    height: inherit;
    margin: 0;
    border: 1px solid transparent;
    border-radius: 20px;
    text-align: center;
  }

  header li:hover {
    background-color: var(--colorNavInverse);
  }
  .active-route {
    background-color: var(--colorNavInverse);
  }

  header a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: inherit;
    height: inherit;
    text-decoration: none;
    font-weight: bold;
  }

  .active-route a {
    color: var(--colorUIFocus);
  }

  header a:hover {
    color: var(--colorUIFocus);
  }

  header button {
    text-decoration: none;
    font-weight: bold;
    height: 100%;
    width: 100%;
    font: inherit;
    background-color: transparent;
    color: var(--colorUI);
    cursor: pointer;
    border: none;
  }

  header button:hover {
    color: var(--colorUIFocus);
  }
</style>
