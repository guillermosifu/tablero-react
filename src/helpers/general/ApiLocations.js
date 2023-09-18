import { URL } from "../ApiUrl";

export const getDepartments = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/locations`, {
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

export const getProvinces = async (bearer, department) => {
  try {
    const fetchResponse = await fetch(`${URL}/locations/${department}`, {
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
export const getDistricts = async (bearer, department, provinces) => {
  try {
    const fetchResponse = await fetch(
      `${URL}/locations/${department}/${provinces}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
