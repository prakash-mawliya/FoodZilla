import { Navigate } from "react-router-dom"
import { authService } from "../services/authServices"

export const AdminPrivateRoute = ({children}) => {
    
   return (authService.getUserRole() === 'admin') ? children : <Navigate to="/login" />
}