import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  // const user = useSelector(selectLoggedInUser);
  // if (!user) {
  // return <Navigate to="/login" replace={true} />;
  // } else {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      {children}
    </>
  );
  // }
};

export default Protected;
