import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { discountedPrice } from "../../../app/constants";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const userOrders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl mt-12 bg-white px-4 sm:px-6 lg:px-8">
      <h1 className="py-4 text-4xl font-bold tracking-tight text-gray-900">
        Your Orders
      </h1>
      {userOrders.length === 0 && (
        <p className="text-lg text-gray-500">No orders found.</p>
      )}
      {userOrders.map((order) => (
        <div key={order.id} className="mb-8 pb-4">
          <h2 className="py-4 text-2xl font-bold tracking-tight text-gray-900">
            Order #{order.id}
          </h2>
          <h3 className="py-4 text-lg font-bold tracking-tight text-red-900">
            Order Status: {order.status.toUpperCase()}
          </h3>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/ProductDetail/${product.id}`}>
                              {product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">$ {discountedPrice(product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty: {product.quantity}
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div>
              <div className="flex justify-between items-center my-2 text-base font-medium text-gray-900 mb-4">
                <p className="text-lg font-semibold">Subtotal:</p>
                <NumericFormat
                  value={order.totalAmount}
                  displayType={"text"}
                  prefix="$ "
                  thousandSeparator
                />
              </div>

              <div className="flex justify-between my-2 items-center text-base font-medium text-gray-900">
                <p>Total Quantity:</p>
                <NumericFormat
                  value={order.totalItems}
                  displayType={"text"}
                  thousandSeparator
                  suffix=" items"
                />
              </div>
            </div>
          </div>

          <hr />
          <p className="mt-0.5 text-sm text-gray-500 py-4">Shipping Address</p>
          <div className="bg-gray-100 p-4 rounded-md mb-4 pb-4">
            <p className="text-lg font-bold leading-6 text-gray-900">
              {order.selectedAddress?.name}
            </p>
            <p className="text-sm leading-5 text-gray-500 mb-1">
              {order.selectedAddress?.street}
            </p>
            <p className="text-xs leading-5 text-gray-500 mb-1">
              {order.selectedAddress?.city}, {order.selectedAddress?.state},{" "}
              {order.selectedAddress?.pinCode}
            </p>
            <p className="text-xs leading-5 text-gray-500">
              {order.selectedAddress?.country}
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-900 mb-1">
              {order.selectedAddress?.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
