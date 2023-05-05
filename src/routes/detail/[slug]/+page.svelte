<script>
  import { page } from "$app/stores";
  import Detail from "../../../components/detail/Detail.svelte";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "../../../store/auth";
  import { onMount } from "svelte";

  onMount(() => {
    if (!$isLoggedIn) goto("/auth");
  });
</script>

<Detail id={$page.params.slug} />
