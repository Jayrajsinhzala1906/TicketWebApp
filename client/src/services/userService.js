import { http } from "../config/http";

export const signUp = async (values) => {
  try {
    return await http.post("user/signup", values);
  } catch (err) {
    return err;
  }
};

export const login = async (values) => {
  try {
    return await http.post("user/login", values);
  } catch (err) {
    return err;
  }
};
