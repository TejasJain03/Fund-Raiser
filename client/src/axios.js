import axios from 'axios';

const instance = axios.create({
  // baseURL:"http://localhost:8080/api",
  baseURL:"https://fund-raiser-server.vercel.app",
  withCredentials: true,
});

export default instance;
