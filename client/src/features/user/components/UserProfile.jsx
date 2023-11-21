import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import {
  fetchAllCountriesAsync,
  selectAllCountries,
} from "../../countries/countriesSlice";
import { AiOutlineClose } from "react-icons/ai";

const UserProfile = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const user = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCountriesAsync());
  }, [dispatch]);

  const countries = useSelector(selectAllCountries);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressEdit = (index) => {
    console.log("handleAddressEdit", index);
    setShowAddForm(false);
    if (selectedAddress === index) {
      setSelectedAddress(null);
    } else {
      setSelectedAddress(index);
      const address = user.addresses[index];
      setValue("name", address.name);
      setValue("email", address.email);
      setValue("phone", address.phone);
      setValue("street", address.street);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("pinCode", address.pinCode);
      setValue("country", address.country );
    }
  };

  const handleAddressChange = (updatedAddress, index) => {
    console.log("handleAddressChange", updatedAddress, index);
    const newUser = { ...user, addresses: [...user.addresses] }; //shallow copy of user object
    newUser.addresses.splice(index, 1, updatedAddress);
    dispatch(updateUserAsync(newUser));
    setSelectedAddress(null);
  };

  const handleAddressRemove = (index) => {
    console.log("handleAddressRemove", index);
    const newUser = { ...user, addresses: [...user.addresses] }; //shallow copy of user object
    dispatch(updateUserAsync(newUser));
  };

  const handleAddressAdd = () => {
    setShowAddForm(true);
    setSelectedAddress(null);
    reset();
  };

  const handleAddFormSubmit = (data) => {
    const newUser = {
      ...user,
      addresses: [...user.addresses, data],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddForm(false);
  };

  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg p-4 min-w-full min-h-full">
      <p className="text-sm text-gray-500 mb-4">
        Details and information about the user.
      </p>
      <div className="border-t border-gray-200 pt-4">
        <dl>
          <div className="bg-gray-50 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="text-sm text-gray-900 col-span-2">
              {user.name ? user.name : "Guest User"}
            </dd>
          </div>
          {user.role === "admin" && (
            <div className="bg-gray-50 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="text-sm text-gray-900 col-span-2">{user.role}</dd>
            </div>
          )}
          <div className="bg-gray-50 grid grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="text-sm text-gray-900 col-span-2">{user.email}</dd>
          </div>

          <div className="bg-gray-50 grid grid-cols-3 gap-4 mt-4">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="text-sm text-gray-900 col-span-2"></dd>
          </div>
        </dl>
      </div>

      {/* Address Stacked List Starts */}
      <ul role="list" className="divide-y divide-gray-100 mt-4">
        {user.addresses.map((address, index) => (
          <>
            <div className="lg:col-span-3">
              {selectedAddress === index && (
                <form
                  className="bg-white p-5 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) =>
                    handleAddressChange(data, index)
                  )}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900 ">
                          Edit Your Address
                        </h2>
                        <AiOutlineClose
                          onClick={() => setSelectedAddress(null)}
                          className="text-red-500 cursor-pointer"
                        />
                      </div>
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
                            htmlFor="   "
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
                                  <option
                                    key={country.value}
                                    value={country.name}
                                  >
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
                              {...register("state", {
                                required: "State is required",
                              })}
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
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Update Address
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <li
              className="flex justify-between items-center gap-4 py-3 hover:bg-gray-100 transition-colors duration-200"
              key={index}
            >
              <div className="flex-1">
                <p className="text-lg font-bold leading-6 text-gray-900">
                  {address.name}
                </p>
                <p className="text-sm leading-5 text-gray-500 mb-1">
                  {address.street}
                </p>
                <p className="text-xs leading-5 text-gray-500 mb-1">
                  {address.city}, {address.state}, {address.pinCode}
                </p>
                <p className="text-xs leading-5 text-gray-500">
                  {address.country}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-sm font-semibold leading-6 text-gray-900 mb-1">
                  {address.phone}
                </p>
                <p className="text-sm leading-5 text-gray-500 mb-1">
                  {address.state}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddressEdit(index)}
                    className={`h-8 px-2 rounded-md ${
                      selectedAddress === index
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {selectedAddress === index ? "Editing" : "Edit"}
                  </button>
                  <button
                    onClick={(e) => handleAddressRemove(e, index)}
                    className="h-8 px-2 rounded-md bg-red-500 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
      {/* Address Stacked List End */}
      {showAddForm && (
        <form
          className="bg-white p-5 mt-12"
          noValidate
          onSubmit={handleSubmit(handleAddFormSubmit)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 ">
                  Add Your Address
                </h2>
                <AiOutlineClose
                  onClick={() => setShowAddForm(false)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
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
                      {...register("state", {
                        required: "State is required",
                      })}
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
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-md bg-red-500 text-white px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
        </form>
      )}
      {!showAddForm && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddressAdd}
            className="h-8 px-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
          >
            Add Address
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
