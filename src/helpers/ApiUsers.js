import { URL } from "./ApiUrl";

export const postLogin = async (registro) => {
  try {
    const fetchResponse = await fetch(`${URL}/auth`, {
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

