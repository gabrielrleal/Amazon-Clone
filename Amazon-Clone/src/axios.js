import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-challenge-e5509.cloudfunctions.net/api",
  // "http://localhost:5001/challenge-e5509/us-central1/api", // local
});

export default instance;
