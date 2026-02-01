import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
};

export default Profile;
