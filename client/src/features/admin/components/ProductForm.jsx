import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createProductAsync,
  selectBrands,
  selectCategories,
} from "../../product-list/productSlice";

const ProductForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const onSubmit = (data) => {
    const product = { ...data };
    product.images = [product.Image1, product.Image2, product.Image3];
    product.rating = 0;
    product.price = parseInt(product.price);
    product.stock = parseInt(product.stock);
    product.discountPercentage = parseInt(product.discountPercentage);

    delete product["Image1"];
    delete product["Image2"];
    delete product["Image3"];
    dispatch(createProductAsync(product));
  };
  return (
    <form
      noValidate
      className="max-w-4xl mx-auto my-8 pb-8 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Product Details
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  id="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="col-span-3">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Price must be greater than zero",
                      },
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-3">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center ">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
                <input
                  type="text"
                  {...register("discountPercentage", {
                    min: {
                      value: 0,
                      message:
                        "Discount percentage must be greater then eqaual to zero",
                    },
                    max: {
                      value: 100,
                      message: "Discount percentage must less than 100",
                    },
                  })}
                  id="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
              </div>
              {errors.discountPercentage && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("stock", {
                    required: "Stock is required",
                    min: {
                      value: 0,
                      message: "Stock must be a non-negative value",
                    },
                  })}
                  id="stock"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.stock && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select a Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.value}>{category.label}</option>
                    ))}
                </select>
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register("brand", {
                    required: "Brand is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select a Brand</option>
                  {brands &&
                    brands.map((brand) => (
                      <option key={brand.value}>{brand.label}</option>
                    ))}
                </select>
              </div>
              {errors.brand && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.brand.message}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Thumbnail
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("thumbnail", {
                  required: "thumbnail is required",
                })}
                id="thumbnail"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.thumbnail && (
              <p className="mt-2 text-sm text-red-500">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="Image1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image1
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("Image1", { required: "Image1 is required" })}
                id="Image1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.Image1 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.Image1.message}
              </p>
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="Image2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image2
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("Image2", { required: "Image2 is required" })}
                id="Image2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.Image2 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.Image2.message}
              </p>
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="Image3"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image3
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("Image3", { required: "Image3 is required" })}
                id="Image3"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.Image3 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.Image3.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end gap-x-6">
        <button
          onClick={() => reset()}
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
