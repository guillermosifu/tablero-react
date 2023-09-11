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
