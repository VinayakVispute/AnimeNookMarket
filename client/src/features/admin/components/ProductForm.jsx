import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import {
  createProductAsync,
  selectBrands,
  selectCategories,
} from "../../product-list/productSlice";
import "./style.css";
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
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageError, setImageError] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError("3 Images are required");
    }
    if (!thumbnail) {
      setThumbnailError("Thumbnail is required");
    }
    if (thumbnailError || imageError) return;
    const productData = { ...data, thumbnail, images };

    dispatch(createProductAsync(productData));
  };

  const handleFileChangeThumbnail = (file) => {
    setThumbnailError(null);
    console.log(file);
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeImages = (file) => {
    setImageError(null);
    const files = file;
    if (files.length !== 3) {
      alert("Please select 3 images together");
      return;
    }
    const selectedFiles =
      files.length > 3 ? Array.from(files).slice(0, 3) : Array.from(files);
    setImages(selectedFiles);

    const newPreviews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <form
      noValidate
      className="max-w-4xl mx-auto my-8 pb-8"
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
                      <option key={category.value} value={category.id}>
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
                      <option key={brand.value} value={brand.id}>
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
            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col  justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                  <FileUploader
                    id="thumbnail"
                    types={["png", "jpg", "jpeg"]}
                    label="Upload Thumbnail"
                    onTypeError={(type) => alert(`${type} is not allowed`)}
                    type="file"
                    children={
                      <div className="flex flex-col items-center h-64 justify-center pt-5 pb-6">
                        {thumbnailPreview ? (
                          <>
                            <img
                              src={thumbnailPreview}
                              alt="Preview"
                              className="w-full h-32 object-cover mb-4 rounded-md"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold underline py-2">
                                Uploaded{" "}
                              </span>
                              Wanna Upload Another?
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, or GIF (MAX. 800x400px)
                            </p>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold underline py-2">
                                Click to upload{" "}
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, or GIF (MAX. 800x400px)
                            </p>
                          </>
                        )}
                      </div>
                    }
                    handleChange={handleFileChangeThumbnail}
                  />
                </label>
              </div>
              {thumbnailError && (
                <p className="mt-2 text-sm text-red-500">{thumbnailError}</p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="images"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Images
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
                  className="flex flex-col  justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                >
                  <FileUploader
                    id="images"
                    label="Upload Images"
                    types={["png", "jpg", "jpeg"]}
                    onTypeError={(type) => alert(`${type} is not allowed`)}
                    children={
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 h-64 ">
                        {imagePreviews.length > 0 ? (
                          <>
                            <div className="grid grid-cols-3 gap-4">
                              {imagePreviews.map((preview, index) => (
                                <img
                                  key={index}
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover mb-4 rounded-md"
                                />
                              ))}
                            </div>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold underline py-2">
                                Uploaded{" "}
                              </span>
                              Wanna Upload Another?
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, or GIF (MAX. 800x400px)
                            </p>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold underline py-2">
                                Click to upload{" "}
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG, or GIF (MAX. 800x400px)
                            </p>
                          </>
                        )}
                      </div>
                    }
                    handleChange={handleFileChangeImages}
                    multiple
                  />
                </label>
              </div>
              {imageError && (
                <p className="mt-2 text-sm text-red-500">{imageError}</p>
              )}
            </div>
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
