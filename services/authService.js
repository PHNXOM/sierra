import api from "../config/api";

export async function login(username, password) {
  const { data } = await api.post("/auth/login", { username, password });
  return data.token;
}

export function register({ username, phone, password }) {
  return api.post("/auth/register", { username, phone, password });
}
