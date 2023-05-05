<script>
  import { key } from "../../store/auth";
  import Button from "../UI/Button.svelte";
  import { goto } from "$app/navigation";
  import { loginUser } from "../../api/auth-api";

  let email = "";
  let password = "";

  const loginHandler = async () => {
    if (email.trim().includes("@") && password.trim().length >= 6) {
      const newKey = await loginUser(email, password);
      if (newKey) {
        console.log(newKey);
        key.set(newKey);
        goto("/", { replaceState: true });
      }
    }
  };
</script>

<h1>Login side</h1>
<form on:submit|preventDefault={loginHandler}>
  <label>epost<input type="email" bind:value={email} required /></label>
  <label>Password<input type="password" bind:value={password} required /></label
  >
  <div>
    <Button type="submit">Login</Button>
  </div>
</form>
