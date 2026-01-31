import { Navigate } from "react-router-dom";
import { authService } from "../services/authServices";

export const UserRoute = ({ children }) => {
  return authService.getUserRole() === "user" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
