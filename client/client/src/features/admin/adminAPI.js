import axiosInstance from "../../services/axiosInstance";

// Verify Worker (Admin)
export const verifyWorker = (workerId) => {
  return axiosInstance.patch(`/admin/verify-worker/${workerId}`);
};

// Get all workers (for admin verification)
export const getAllWorkers = () => {
  return axiosInstance.get("/admin/workers");
};

// Get all ratings (Admin)
export const getAllRatings = () => {
  return axiosInstance.get("/ratings");
};
