<script>
  import { page } from "$app/stores";
  import Edit from "../../../components/edit/Edit.svelte";
  import { onMount } from "svelte";
  import { getAllVarer } from "../../../api/api";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "../../../store/auth";

  let vareData = null;
  let id = $page.params.slug;
  onMount(async () => {
    if (!$isLoggedIn) goto("/auth");
    vareData = await getAllVarer();
  });
</script>

<Edit {vareData} {id} />
