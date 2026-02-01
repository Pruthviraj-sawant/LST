import axios from "../../services/axiosInstance";

export const createBooking = (data) =>
  axios.post("/bookings", data);

export const getMyBookings = (role) => {
  const url =
    role === "WORKER"
      ? "/bookings/worker"
      : "/bookings/user";
  return axios.get(url);
};

export const cancelBooking = (id) =>
  axios.patch(`/bookings/${id}/cancel`);
