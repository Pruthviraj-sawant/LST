import axios from "../../services/axiosInstance";

export const getProfile = () => {
  return axios.get("/profile/me");
};

export const updateProfile = (data) => {
  return axios.patch("/profile", data);
};

export const uploadProfileImage = (formData, role) => {
  const endpoint =
    role === "WORKER"
      ? "/upload/worker/profile-image"
      : "/upload/user/profile-image";

  return axios.patch(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
