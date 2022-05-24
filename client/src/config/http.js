import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API,
});

http.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
