// src/requestMethods.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// For public endpoints (e.g. login, register)
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// For protected routes (requires token)
export const authRequest = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
