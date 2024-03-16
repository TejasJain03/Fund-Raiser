import axios from 'axios';

const instance = axios.create({
  baseURL:"https://fund-raiser-five.vercel.app/",
  withCredentials: true,
});

export default instance;
