import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import Protected from "./features/product-list/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/MessagePage/PageNotFound";
import PaymentSuccessPage from "./pages/MessagePage/PaymentSuccessPage";
function App() {
  const user = useSelector(selectLoggedInUser); // Get the logged-in user from the store
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />

        {/* Conditionally render the RegisterPage based on the user */}
        <Route
          path="/Register"
          element={user ? <Navigate to="/" replace={true} /> : <RegisterPage />}
        />

        {/* Conditionally render the LoginPage based on the user */}
        <Route
          path="/Login"
          element={user ? <Navigate to="/" replace={true} /> : <LoginPage />}
        />
        <Route
          path="/Cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/Checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/ProductDetail/:productId"
          element={
            <Protected>
              <ProductDetailPage />
            </Protected>
          }
        />
        <Route
          path="/order-success/:orderId"
          element={<PaymentSuccessPage />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
