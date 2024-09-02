import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? <><Navigate to="/" replace /></> : <>{children}</>;
};

export default PublicRoute;
