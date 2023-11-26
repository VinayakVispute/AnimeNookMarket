import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectedProductById,
  updateProductAsync,
} from "../../product-list/productSlice";

const ProductForm = () => {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectedProductById);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        await dispatch(fetchProductByIdAsync(productId));
      } else {
        dispatch(clearSelectedProduct());
      }
    };
    fetchData();
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && productId) {
      setFieldValues();
    }
  }, [product, setValue, productId]);

  const setFieldValues = () => {
    const {
      title,
      description,
      price,
      discountPercentage,
      stock,
      category,
      brand,
      thumbnail,
      images,
    } = product;
    setValue("title", title);
    setValue("description", description);
    setValue("price", price);
    setValue("discountPercentage", discountPercentage);
    setValue("stock", stock);
    setValue("category", category);
    setValue("brand", brand);
    setValue("thumbnail", thumbnail);

    if (images && images.length >= 3) {
      setValue("Image1", images[0]);
      setValue("Image2", images[1]);
      setValue("Image3", images[2]);
    }
  };

  const handleDelete = () => {
    const productData = { ...product };
    productData.isDeleted = true;
    dispatch(updateProductAsync(productData));
  };

  const onSubmit = (data) => {
    const productData = { ...data };
    productData.images = [data.Image1, data.Image2, data.Image3];

    productData.price = parseInt(data.price);
    productData.stock = parseInt(data.stock);
    productData.discountPercentage = parseInt(data.discountPercentage);
    productData.id = parseInt(productId);
    delete productData["Image1"];
    delete productData["Image2"];
    delete productData["Image3"];
    dispatch(updateProductAsync(productData));
    navigate(`/ProductDetail/${productId}`, { replace: true });
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
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
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
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
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
                {...register("Image1")}
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
                {...register("Image2")}
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
                {...register("Image3")}
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
          type="button"
          onClick={handleDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 me-2"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth={1}
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              strokeDasharray
              strokeDashoffset={0}
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g transform="scale(10.66667,10.66667)">
                <path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.52734,13.26367c0.132,0.99 0.98442,1.73633 1.98242,1.73633h8.24805c0.998,0 1.85138,-0.74514 1.98438,-1.74414l1.52734,-13.25586z" />
              </g>
            </g>
          </svg>
          Delete
        </button>

        <button
          onClick={() => {
            navigate(-1); // This is equivalent to history.goBack()
          }}
          type="button"
          className="rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-600"
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
