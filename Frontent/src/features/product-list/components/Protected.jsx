import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return children;
  }
};

export default Protected;
