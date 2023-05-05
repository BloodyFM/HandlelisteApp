import { writable } from "svelte/store";
export let handlelister = writable({});

// y this not working (;-;)
export const addElement = (id, name) => {
  var l = handlelister.length;
  handlelister[l] = { id, name };
  console.log("v");
};
