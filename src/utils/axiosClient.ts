import axios from 'axios';
const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}:5000`,
});
export default axiosClient;
