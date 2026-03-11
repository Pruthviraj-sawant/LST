import axiosInstance from "../../services/axiosInstance";

export const createBooking = (data) =>
  axiosInstance.post("/bookings", data);

export const getMyBookings = (role) => {
  const url =
    role === "WORKER"
      ? "/bookings/worker"
      : "/bookings/user";
  return axiosInstance.get(url);
};

export const getWorkerBookings = () =>
  axiosInstance.get("/bookings/worker");

export const getUserBookings = () =>
  axiosInstance.get("/bookings/user");

export const acceptBooking = (id) =>
  axiosInstance.patch(`/bookings/${id}/accept`);

export const completeBooking = (id) =>
  axiosInstance.patch(`/bookings/${id}/complete`);

export const cancelBooking = (id) =>
  axiosInstance.patch(`/bookings/${id}/cancel`);
