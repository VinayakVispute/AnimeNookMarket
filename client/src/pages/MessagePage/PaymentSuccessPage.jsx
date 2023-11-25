import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"; // Import Link and useNavigate from react-router-dom

import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../../features/cart/cartSlice";
import { resetOrder } from "../../features/orders/orderSlice";

const PaymentSuccessPage = () => {
  const { orderId } = useParams();
  const dispatach = useDispatch();

  useEffect(() => {
    dispatach(resetCartAsync());
    dispatach(resetOrder());
  }, [dispatach]);

  return (
    <>
      {!orderId && <Navigate to="/" replace={true} />}
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="bg-white p-8 md:p-12 max-w-md mx-auto rounded-md shadow-md text-center">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div>
            <h3 className="md:text-2xl text-lg text-gray-900 font-semibold mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              Thank you for completing your secure online payment.
            </p>
            <p className="text-gray-600 mb-6">Your Order Number:</p>
            <p className="text-2xl text-indigo-600 font-semibold mb-6">
              # {orderId}
            </p>
            <p className="text-gray-600 mb-6">Have a great day!</p>
            <div className="flex justify-between items-center">
              <Link
                to="/orders" // Update this link with the actual route to view orders
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
              >
                View Your Orders
              </Link>
              <Link
                to="/" // Replace this link with the actual route for other actions
                className="inline-block px-6 py-3 bg-gray-300 hover:bg-gray-200 text-gray-700 font-semibold"
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
