import axios from "axios";

export const API_URL = "http://192.168.1.6:8000";

export default axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
