import axios from "axios";
import { API_URL } from "../constants/config";

const api = axios.create({ baseURL: API_URL });

// Sets (or clears) the JWT sent with every request.
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export const MULTIPART_HEADERS = { "Content-Type": "multipart/form-data" };

export default api;
