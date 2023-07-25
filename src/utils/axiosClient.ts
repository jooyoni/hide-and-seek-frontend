import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://172.30.1.71:5000',
});
export default axiosClient;
