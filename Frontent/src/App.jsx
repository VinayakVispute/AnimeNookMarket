import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin"; // Import ProtectedAdmin
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/MessagePage/PageNotFound";
import PaymentSuccessPage from "./pages/MessagePage/PaymentSuccessPage";
import UserOrdersPage from "./pages/OrderPage/UserOrderPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import AdminProductDetailPage from "./pages/AdminProductDetailPage/AdminProductDetailPage";
import ProductForm from "./features/admin/components/ProductForm";
import ProductEditForm from "./features/admin/components/ProductEditForm";
import Navbar from "./features/navbar/Navbar";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "./features/product-list/productSlice";
import AdminOrdersPage from "./pages/AdminOrdersPage/AdminOrdersPage";

function App() {
  const user = useSelector(selectLoggedInUser); // Get the logged-in user from the store
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await Promise.all([
          dispatch(fetchItemsByUserIdAsync(user.id)),
          dispatch(fetchLoggedInUserAsync(user.id)),
        ]);
      }

      // Fetch categories and brands concurrently
      await Promise.all([
        dispatch(fetchCategoriesAsync()),
        dispatch(fetchBrandsAsync()),
      ]);
    };

    fetchData();
  }, [dispatch, user]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Protected>
                <Home />
              </Protected>
            </>
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
            <>
              <Navbar />
              <Protected>
                <ProductDetailPage />
              </Protected>
            </>
          }
        />
        <Route
          path="/Orders"
          element={
            <Protected>
              <UserOrdersPage />
            </Protected>
          }
        />
        <Route
          path="/Profile"
          element={
            <>
              <Navbar />
              <Protected>
                <ProfilePage />
              </Protected>
            </>
          }
        />
        <Route
          path="/order-success/:orderId"
          element={
            <Protected>
              <PaymentSuccessPage />
            </Protected>
          }
        />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/admin" element={<ProtectedAdmin />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminHomePage />} />
          <Route
            path="product-detail/:productId"
            element={<AdminProductDetailPage />}
          />
          <Route path="productForm" element={<ProductForm />} />
          <Route path=":productId/edit" element={<ProductEditForm />} />
          <Route
            path="OrderStatus"
            element={
              <>
                <Navbar />
                <AdminOrdersPage />
              </>
            }
          />
        </Route>

        {/*For Testing Purpose Dont Touch */}

        {/*Testing Route End */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
