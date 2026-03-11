import axios from "axios";
import store from "../app/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api"
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//we have taken baseURL as http://localhost:5000/api because our server is running on port 5000 and all our API routes are prefixed with /api. This way, we can simply use relative paths in our API calls without worrying about the full URL.
//we have created an axios instance using axios.create() and set the baseURL to our server's API endpoint. This allows us to use this instance for all our API calls and automatically prepend the baseURL to our requests.
//we have added an interceptor to our axios instance that will be called before every request is sent. In this interceptor, we get the token from our Redux store using store.getState().auth.token. If the token exists, we add it to the Authorization header of the request in the format "Bearer <token>". This way, we can ensure that all our API requests include the JWT token for authentication, and we don't have to manually add it to each request in our API calls.
//we have exported the axios instance so that we can import it in our API files and use it to make API calls. This way, we can centralize our API configuration and ensure that all our API calls are consistent and include the necessary authentication headers.
export default axiosInstance;
