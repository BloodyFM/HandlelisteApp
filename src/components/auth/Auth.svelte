<script>
  import { key } from "../../store/auth";
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

<h1 class="text-center mb-3 mt-5">Login side</h1>
<form on:submit|preventDefault={loginHandler}>
  <div class="row">
    <div class="col-12 form-floating mb-3">
      <input
        class="form-control bg-secondary rounded-5"
        type="email"
        id="inputEmail"
        bind:value={email}
        required
        placeholder="name@email.com"
      />
      <label class="form-label text-secondary ps-4" for="inputEmail"
        >epost</label
      >
    </div>
    <div class="col-12 form-floating mb-3">
      <input
        class="form-control bg-secondary rounded-5"
        type="password"
        id="inputPassword"
        bind:value={password}
        required
        placeholder="12345678"
      />
      <label class="form-label text-secondary ps-4" for="inputPassword"
        >Password</label
      >
    </div>
    <div>
      <button type="submit" class="btn btn-primary w-100 btn-lg rounded-5"
        >Login</button
      >
    </div>
  </div>
</form>
