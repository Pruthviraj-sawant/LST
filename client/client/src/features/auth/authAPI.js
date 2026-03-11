import axiosInstance from "../../services/axiosInstance";

// Register Customer
export const registerCustomer = (data) => {
  return axiosInstance.post("/auth/register/customer", data);
};

// Register Worker
export const registerWorker = (data) => {
  return axiosInstance.post("/auth/register/worker", data);
};

// Login
export const login = (data) => {
  return axiosInstance.post("/auth/login", data);
};
