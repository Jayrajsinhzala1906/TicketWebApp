import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const user = useSelector((state) => state);
  return <>{user ? props.children : <Navigate to="/login" />}</>;
}
