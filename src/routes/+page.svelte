<script>
  import List from "../components/listView/List.svelte";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "../store/auth";
  import { onMount } from "svelte";

  onMount(() => {
    if (!$isLoggedIn) goto("/auth");
  });
</script>

<List />
