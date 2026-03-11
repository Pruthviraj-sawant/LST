import axiosInstance from "../../services/axiosInstance";

export const getProfile = () => {
  return axiosInstance.get("/profile/me");
};

export const updateProfile = (data) => {
  return axiosInstance.patch("/profile", data);
};

export const uploadProfileImage = (formData, role) => {
  const endpoint =
    role === "WORKER"
      ? "/upload/worker/profile-image"
      : "/upload/user/profile-image";

  return axiosInstance.patch(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
