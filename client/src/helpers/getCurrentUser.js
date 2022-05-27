import { http } from "../config/http";

export const getCurrentUser = async () => {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;

  try {
    const response = await http.get("/user/me");
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
