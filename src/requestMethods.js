import axios from "axios";

export const publicRequest = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const userRequest = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });