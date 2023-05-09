import { goto } from "$app/navigation";
import { writable, derived } from "svelte/store";

export const key = writable("");
export const isLoggedIn = derived(key, ($key) => setIsLoggedIn($key));
let init = false;

const setIsLoggedIn = (key) => {
  if (key != "") {
    localStorage.setItem("key", key);
    init = true;
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const remainingTime = calculateRemainingTime(expirationTime);
      logoutTimer = setTimeout(logoutCtx, remainingTime);
    }
    return true;
  } else {
    if (init) localStorage.removeItem("key");
    init = true;
    return false;
  }
};

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const numExpirationTime = new Date(expirationTime).getTime();

  return numExpirationTime - currentTime;
};

export const loginCtx = (newKey, expirationTime) => {
  localStorage.setItem("expirationTime", expirationTime);

  key.set(newKey);

  const remainingTime = calculateRemainingTime(expirationTime);

  logoutTimer = setTimeout(logoutCtx, remainingTime);
};

export const logoutCtx = () => {
  localStorage.removeItem("expirationTime");

  key.set("");

  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  goto("/auth", { replaceState: true });
};
