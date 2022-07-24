import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status < 500;
  },
});
