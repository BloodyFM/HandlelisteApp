import { writable, derived } from "svelte/store";

export const key = writable("");
export const isLoggedIn = derived(key, ($key) => setIsLoggedIn($key));
let init = false;

const setIsLoggedIn = (key) => {
  if (key != "") {
    localStorage.setItem("key", key);
    init = true;
    return true;
  } else {
    if (init) localStorage.removeItem("key");
    init = true;
    return false;
  }
};
