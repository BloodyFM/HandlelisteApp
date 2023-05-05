<script>
  import Auth from "../../components/auth/Auth.svelte";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "../../store/auth";
  import { onMount } from "svelte";

  onMount(() => {
    if ($isLoggedIn) goto("/");
  });
</script>

<Auth />
