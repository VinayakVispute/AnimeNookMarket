import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = () => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  } else if (userInfo.role !== "admin") {
    console.log("userInfo", userInfo.role);
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </header>
        <Outlet />
      </>
    );
  }
};

export default ProtectedAdmin;
