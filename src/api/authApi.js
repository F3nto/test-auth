import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export const postRegisterApi = async (data) => {
  return await authApi.post("/register", data);
};

export const getUserApi = async () => {
  const response = await authApi.get("/");
  return response.data;
};

export const postLoginApi = async (data) => {
  return await authApi.post('/login', data) 
}
