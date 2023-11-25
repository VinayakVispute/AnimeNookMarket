import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const validatePasswordMatch = (value) => {
    return value === password.value || "Passwords do not match";
  };

  const onSubmit = (data) => {
    try {
      dispatch(
        createUserAsync({
          email: data.email,
          password: data.password,
          addresses: [],
          role: "user",
          //TODO: We will give this role from backend directly
        })
      );
      if (user) {
        alert("Register Successfully");
      } else {
        alert("Register Failed");
      }
    } catch (err) {
      alert("Register Failed");
    }
  };

  const inputClassName = (field) =>
    `block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
      errors[field] ? "ring-red-500" : "ring-gray-300"
    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  formNoValidate
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={inputClassName("email")}
                />

                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must be at most 16 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,16}$/,
                      message:
                        "Password must be 8-16 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
                    },
                  })}
                  type="password"
                  className={inputClassName("password")}
                />

                {errors.password && (
                  <div className="text-red-500">{errors.password.message}</div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="repassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repassword"
                  {...register("repassword", {
                    required: "This field is required",
                    validate: validatePasswordMatch,
                  })}
                  type="password"
                  className={inputClassName("repassword")}
                />
                {errors.repassword && (
                  <span className="text-red-500">
                    {errors.repassword.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/Login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
