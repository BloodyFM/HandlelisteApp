<script>
  import { goto } from "$app/navigation";
  import { loginCtx } from "../../store/auth";
  import { loginUser } from "../../api/auth-api";

  let email = "";
  let password = "";

  const loginHandler = async () => {
    if (email.trim().includes("@") && password.trim().length >= 6) {
      const newKey = await loginUser(email, password);
      if (newKey) {
        const expiresIn = 60 * 60 * 3; // in seconds
        const expirationTime = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        loginCtx(newKey, expirationTime);
        goto("/", { replaceState: true });
      }
    }
  };
</script>

<h1 class="text-center mb-3 mt-5">Login side</h1>
<form on:submit|preventDefault={loginHandler}>
  <div class="row">
    <div class="col-12">
      <div class="form-floating mb-3 mx-3">
        <input
          class="form-control rounded-4 border-primary"
          type="email"
          id="inputEmail"
          bind:value={email}
          required
          placeholder="name@email.com"
        />
        <label class="form-label text-secondary" for="inputEmail">epost</label>
      </div>
    </div>
    <div class="col-12">
      <div class="form-floating mb-3 mx-3">
        <input
          class="form-control rounded-4 border-primary"
          type="password"
          id="inputPassword"
          bind:value={password}
          required
          placeholder="12345678"
        />
        <label class="form-label text-secondary" for="inputPassword"
          >Password</label
        >
      </div>
    </div>
    <div class="col-12 d-flex">
      <button
        type="submit"
        class="btn btn-secondary flex-fill btn-lg rounded-4 mx-3">Login</button
      >
    </div>
  </div>
</form>
