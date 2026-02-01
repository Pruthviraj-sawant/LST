import { useSelector } from "react-redux";

const Dashboard = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "WORKER") return <h2>Worker Dashboard</h2>;
  if (role === "USER") return <h2>User Dashboard</h2>;
  return null;
};

export default Dashboard;
