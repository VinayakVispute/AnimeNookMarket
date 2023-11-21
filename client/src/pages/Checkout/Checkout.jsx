import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import {
  deleteItemsfromCartAsync,
  selectItems,
  updateCartAsync,
} from "../../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  fetchAllCountriesAsync,
  selectAllCountries,
} from "../../features/countries/countriesSlice";
import {
  createOrderAsync,
  selectCurrentOrderPlaced,
} from "../../features/orders/orderSlice";
import { selectUserInfo, updateUserAsync } from "../../features/user/userSlice";
import { discountedPrice } from "../../app/constants";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo); // Get the logged-in user from the store
  const [selectedAddress, setSelectedAddress] = useState(
    user.addresses.length > 0 ? user.addresses[0] : null
  );

  useEffect(() => {
    dispatch(fetchAllCountriesAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const countries = useSelector(selectAllCountries);
  const items = useSelector(selectItems);
  const currentOrderPlaced = useSelector(selectCurrentOrderPlaced);
  const totalAmount = items.reduce(
    (total, item) => discountedPrice(item) * item.quantity + total,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQualityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity === 0) {
      dispatch(deleteItemsfromCartAsync(item.id));
    } else {
      dispatch(updateCartAsync({ ...item, quantity: newQuantity }));
    }
  };

  const handleRemove = (e, productId) => {
    dispatch(deleteItemsfromCartAsync(productId));
  };

  const onSubmit = (data) => {
    console.log({ ...user, addresses: [...user.addresses, data] });
    dispatch(
      updateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };
  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayementMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      selectedAddress,
      paymentMethod,
      user,
      status: "Pending",
    };
    dispatch(createOrderAsync(order));
    //TODO : redirect to successpage
    //TODO : clear the cart
    //TODO : on server change the quantity of the product
  };
  return (
    <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      {items.length === 0 && <Navigate to="/" replace={true} />}
      {currentOrderPlaced && (
        <Navigate
          to={`/order-success/${currentOrderPlaced.id}`}
          replace={true}
        />
      )}

      <div className="lg:col-span-3">
        <form
          className="bg-white p-5 mt-12"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Update your Address
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.name && errors.name.message}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email && errors.email.message}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country", {
                        required: "Country is required",
                      })}
                      defaultValue="india" // Set the default value to 'India'
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      {countries &&
                        countries.map((country) => (
                          <option key={country.value} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.country && errors.country.message}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("street", {
                        required: "Street is required",
                      })}
                      id="street"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.street && errors.street.message}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", {
                        required: "City is required",
                      })}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.city && errors.city.message}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("state", { required: "State is required" })}
                      id="state"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.state && errors.state.message}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      {...register("pinCode", {
                        required: "Pin Code is required",
                      })}
                      id="pinCode"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.pinCode && errors.pinCode.message}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type=""
                      {...register("phone", {
                        required: "Phone Number is required",
                      })}
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                  </div>
                  <div className="text-red-500 text-sm mt-1">
                    {errors.phone && errors.phone.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-6 text-gray-900 mb-2">
                Address
              </h2>
              <p className="text-sm leading-5 text-gray-600 mb-6">
                Choose from existing addresses
              </p>

              {/* Address Stacked List Starts */}
              <ul role="list" className="divide-y divide-gray-100">
                {user.addresses.map((address, index) => (
                  <label htmlFor={address?.id} key={address?.id}>
                    <li className="flex justify-between items-center gap-4 py-3">
                      <div className="flex-1">
                        <p className="text-lg font-bold leading-6 text-gray-900">
                          {address?.name}
                        </p>
                        <p className="text-sm leading-5 text-gray-500 mb-1">
                          {address?.street}
                        </p>
                        <p className="text-xs leading-5 text-gray-500 mb-1">
                          {address?.city}, {address?.state}, {address?.pinCode}
                        </p>
                        <p className="text-xs leading-5 text-gray-500">
                          {address?.country}
                        </p>
                      </div>

                      <div className="flex flex-col items-end">
                        <p className="text-sm font-semibold leading-6 text-gray-900 mb-1">
                          {address?.phone}
                        </p>
                        <p className="text-sm leading-5 text-gray-500 mb-1">
                          {address?.state}
                        </p>

                        <input
                          id={address?.id}
                          name="address"
                          type="radio"
                          onChange={handleAddress}
                          defaultChecked={index === 0}
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                    </li>
                  </label>
                ))}
              </ul>
              {/* Address Stacked List End */}

              <div className="mt-8 space-y-4">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="text-sm leading-5 text-gray-600">
                    Choose one of the payment methods
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payment-methods"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value="cash"
                        onChange={handlePayementMethod}
                        checked={paymentMethod === "cash"}
                      />
                      <label
                        htmlFor="cash"
                        className="text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>

                    <div className="flex items-center gap-x-3">
                      <input
                        id="card-payment"
                        name="payment-methods"
                        type="radio"
                        value="card"
                        onChange={handlePayementMethod}
                        checked={paymentMethod === "card"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card-payment"
                        className="text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="lg:col-span-2">
        <div className="mx-auto max-w-7xl mt-12 bg-white px-2 sm:px-2 lg:px-2 border rounded-lg">
          <h1 className=" py-4 text-4xl font-bold tracking-tight text-gray-900 pr-1">
            Cart
          </h1>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((product) => (
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
                            Qty
                          </label>
                          <select
                            className="mx-4"
                            value={product.quantity}
                            onChange={(e) => handleQualityChange(e, product)}
                          >
                            <option value="0">0(Delete)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>

                          {/* {product.quantity} */}
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => handleRemove(e, product.id)}
                          >
                            Remove
                          </button>
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
                  value={totalAmount}
                  displayType={"text"}
                  prefix="$ "
                  thousandSeparator
                />
              </div>

              <div className="flex justify-between my-2 items-center text-base font-medium text-gray-900">
                <p>Total Quantity:</p>
                <NumericFormat
                  value={totalItems}
                  displayType={"text"}
                  thousandSeparator
                  suffix=" items"
                />
              </div>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handleOrder}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
              >
                Pay and Order
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 pl-1"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
