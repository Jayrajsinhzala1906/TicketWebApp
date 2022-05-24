import { http } from "../config/http";

export const getCurrentUser = async () => {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;
  // const userData = localStorage.getItem("user");
  // if (userData) {
  //   try {
  //     const data = JSON.parse(userData);
  //     console.log("user response data", data);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return null;
  // }
  console.log("not found");
  try {
    const response = await http.get("/user/me");
    console.log("user response", response);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
