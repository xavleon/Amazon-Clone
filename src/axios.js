import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-20100/us-central1/api", // THE API (Cloud function) URL
});

export default instance;
