import { Navigate } from "react-router-dom";
import { authService } from "../services/authServices";

export const OwnerRoute = ({ children }) => {
  return authService.getUserRole() === "owner" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};
