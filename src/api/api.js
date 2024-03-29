let url = "http://localhost:5076/api/";

export async function getHandlelister(userId) {
  const response = await fetch(url + "Handleliste/byUserId/" + userId, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5076",
      accept: "text/plain",
    },
  });
  const data = await response.json();
  return data;
}

export async function deleteHandleliste(listeId) {
  const response = await fetch(url + "Handleliste/" + listeId, {
    method: "DELETE",
    headers: { accept: "*/*" },
  });
}

export async function editHandleliste(listeId, listeData) {
  const response = await fetch(url + "Handleliste/" + listeId, {
    method: "put",
    body: JSON.stringify(listeData),
    headers: { "Content-Type": "application/json" },
  });
}

export async function cloneHandleliste(listeId) {
  // grab list in question
  const getResponse = await fetch(url + "HandlelisteWithVarer/" + listeId, {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "http://localhost:5076" },
  });
  const getData = await getResponse.json();
  getData.handlelisteName += " clone";
  getData.handlelisteId = 0; // probably not nedded but now im sure it does not clash

  // post list with "clone" added to the name
  const postResponse = await fetch(url + "HandlelisteWithVarer", {
    method: "POST",
    body: JSON.stringify(getData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!postResponse.ok) {
    throw postResponse;
  }

  const postData = await postResponse.json();
  return postData;
}

export async function getDetailedHandleliste(listeId) {
  const response = await fetch(url + "HandlelisteWithVarer/" + listeId, {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "http://localhost:5076" },
  });
  const data = await response.json();
  return data;
}

export async function createNewHandleliste(listeData) {
  const response = await fetch(url + "Handleliste", {
    method: "POST",
    body: JSON.stringify(listeData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw response;
  }

  return await response.json();
}

export async function getAllVarer() {
  const response = await fetch(url + "Vare", {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "http://localhost:5076" },
  });
  const data = await response.json();
  return data;
}

export async function addVare(vareData) {
  const response = await fetch(url + "Vare", {
    method: "POST",
    body: JSON.stringify(vareData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw response;
  }

  const data = await response.json();
  return data;
}

export async function addVareInstace(handlelisteId, vareData) {
  const response = await fetch(
    url + "HandlelisteWithVarer/VareInstance/" + handlelisteId,
    {
      method: "POST",
      body: JSON.stringify(vareData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw response;
  }
}

export async function deleteVareInstance(handlelisteId, vareId) {
  const response = await fetch(
    url +
      "HandlelisteWithVarer/VareInstance/" +
      handlelisteId +
      "?vareId=" +
      vareId,
    {
      method: "DELETE",
      headers: { accept: "*/*" },
    }
  );
}

export async function editVareInstance(handlelisteId, vareData) {
  const response = await fetch(
    url + "HandlelisteWithVarer/VareInstance/" + handlelisteId,
    {
      method: "PUT",
      body: JSON.stringify(vareData),
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function setIsCollected(handlelisteId, vareId, IsCollected) {
  const response = await fetch(
    url +
      "HandlelisteWithVarer/IsCollected/" +
      handlelisteId +
      "?vareId=" +
      vareId +
      "&isCollected=" +
      IsCollected,
    {
      method: "PUT",
      headers: {
        accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    throw response;
  }
}

export async function getSuggestedItem(handlelisteId) {
  const getResponse = await fetch(url + "Vare/Recommend/" + handlelisteId, {
    method: "GET",
    headers: { accept: "text/plain" },
  });
  const getData = await getResponse.json();
  return getData;
}
