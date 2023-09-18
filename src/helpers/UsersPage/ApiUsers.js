import { URL } from "../ApiUrl";

export const getUsers = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const postUser = async (registro) => {
  try {
    const fetchResponse = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const putUser = async (registro, id) => {
  try {
    const fetchResponse = await fetch(`${URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const fetchResponse = await fetch(`${URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};