<script>
  import Create from "../../components/create/Create.svelte";
  import { onMount } from "svelte";
  import { getAllVarer } from "../../api/api";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "../../store/auth";

  let vareData = null;
  onMount(async () => {
    if (!$isLoggedIn) goto("/auth");
    vareData = await getAllVarer();
  });
</script>

<Create {vareData} />
