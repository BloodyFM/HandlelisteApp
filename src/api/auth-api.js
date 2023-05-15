export const loginUser = async (email, password) => {
  const data = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmYZ3TihDNJ_5ujmQ_HHAveX39pYL3sdw",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Response("Could not login user");
    }
  });
  const { localId } = data;

  return localId;
};
