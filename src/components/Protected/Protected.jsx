import { Navigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/UserUtils";

const Protected = ({ requiredRole, children }) => {
  const loggedInUser = getLoggedInUser()
  const userRole = loggedInUser ? loggedInUser.role : null

  if (!["admin", "user"].includes(userRole)) {
    console.log(1)
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "admin" && userRole !== "admin") {
    console.log(2)
    return <Navigate to="/" replace />;
  }

  if (requiredRole === "user" && userRole !== "user") {
    console.log(3)
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;