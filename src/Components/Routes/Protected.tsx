import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { Navigate } from "react-router";
import { JsxElement } from "typescript";
import { JSX } from "react";
interface ProtectedRouteProps{
  children:JSX.Element;
}
export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }
  return children;
};
