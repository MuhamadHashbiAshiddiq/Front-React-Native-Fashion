import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.6:8000",
});

export const baseUrlAxios = axios.create({
  baseURL: "http://192.168.1.6:8000",
  withCredentials: true,
  headers: {
      'Content-Type': 'application/json'
  },
})