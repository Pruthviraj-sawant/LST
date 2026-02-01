import axios from "../../services/axiosInstance";

// ⭐ Rate WEBSITE (general feedback)
export const createWebsiteRating = (data) => {
  return axios.post("/ratings", data);
};

// ⭐ Rate WORKER (booking based)
export const rateWorker = (workerId, data) => {
  return axios.post(`/ratings/worker/${workerId}`, data);
};

// 📥 Get ratings for a worker
export const getRatingsForWorker = (workerId) => {
  return axios.get(`/ratings/worker/${workerId}`);
};

// 📥 Admin: get all ratings
export const getAllRatings = () => {
  return axios.get("/ratings");
};

// ✏ Update rating (only creator)
export const updateRating = (ratingId, data) => {
  return axios.put(`/ratings/${ratingId}`, data);
};

// ❌ Admin delete rating
export const deleteRating = (ratingId) => {
  return axios.delete(`/ratings/${ratingId}`);
};
