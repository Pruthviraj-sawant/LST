import axiosInstance from "../../services/axiosInstance";


// ⭐ Rate WEBSITE (general feedback)
export const createWebsiteRating = (data) => {
  return axiosInstance.post("/ratings", data);
};


// ⭐ Rate WORKER (booking based)
export const rateWorker = (workerId, data) => {
  return axiosInstance.post(`/ratings/worker/${workerId}`, data);
};

// 📥 Get ratings for a worker
export const getRatingsForWorker = (workerId) => {
  return axiosInstance.get(`/ratings/worker/${workerId}`);
};

// 📥 Get a specific rating by ID
export const getRatingById = (ratingId) => {
  return axiosInstance.get(`/ratings/${ratingId}`);
};

// 📥 Admin: get all ratings
export const getAllRatings = () => {
  return axiosInstance.get("/ratings");
};

// ✏ Update rating (only creator)
export const updateRating = (ratingId, data) => {
  return axiosInstance.put(`/ratings/${ratingId}`, data);
};

// ❌ Admin delete rating
export const deleteRating = (ratingId) => {
  return axiosInstance.delete(`/ratings/${ratingId}`);
};
