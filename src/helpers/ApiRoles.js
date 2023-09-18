import { URL } from "./ApiUrl";

export const getModules = async (bearer) => {
  try {
    const fetchResponse = await fetch(`${URL}/companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearer}`,
      },
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getRoles = async (bearer) => {
  try {
    const fetchResponse = await fetch(`${URL}/roles`, {
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
