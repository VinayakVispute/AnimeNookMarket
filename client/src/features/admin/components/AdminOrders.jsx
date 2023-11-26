import { Fragment, useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import {
  PencilIcon,
  EyeIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, seteditableOrderId] = useState(null);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  useEffect(() => {
    setPage(1);
  }, [totalOrders]);

  const handleEdit = (order) => {
    seteditableOrderId(order.id);
  };
  const handleStatusUpdate = async (status, order) => {
    const updateOrder = { ...order, status: status };
    await dispatch(updateOrderAsync(updateOrder));
    seteditableOrderId(null);
  };
  const handleShow = (order) => {};

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-700 text-yellow-200";
      case "Dispatched":
        return "bg-blue-700 text-blue-200";
      case "Delivered":
        return "bg-green-700 text-green-200";
      case "Cancelled":
        return "bg-red-700 text-red-200";
      case "PendingEdit":
        return "bg-yellow-200 text-yellow-800";
      case "DispatchedEdit":
        return "bg-blue-200 text-blue-800";
      case "DeliveredEdit":
        return "bg-green-200 text-green-800";
      case "CancelledEdit":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-700 text-gray-200";
    }
  };

  const handleSort = (option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  return (
    <div className="min-w-screen pb-8">
      <div className="bg-white shadow-md rounded my-6  min-w-screen">
        <section className="bg-gray-50  flex items-center min-w-screen">
          <div className="max-w-full   w-full">
            {/* Start coding here */}
            <div className="relative bg-white shadow-md  sm:rounded-lg">
              <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                        placeholder="Search"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                  <div className="flex items-center justify-between w-full gap-x-16 px-10">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Status
                          <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? getStatusColor("Pending")
                                      : getStatusColor("PendingEdit"),
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Pending
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? getStatusColor("Dispatched")
                                      : getStatusColor("DispatchedEdit"),
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Dispatched
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? getStatusColor("Delivered")
                                      : getStatusColor("DeliveredEdit"),
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Delivered
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={classNames(
                                    active
                                      ? getStatusColor("Cancelled")
                                      : getStatusColor("CancelledEdit"),
                                    "block px-4 py-2 text-sm cursor-pointer"
                                  )}
                                >
                                  Cancelled
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <table className="bg-gray-100 min-h-screen min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th
                className="py-3 px-6 text-left cursor-pointer flex items-center justify-center"
                onClick={(e) =>
                  handleSort({
                    sort: "id",
                    order: sort._order === "asc" ? "desc" : "asc",
                  })
                }
              >
                Order No.
                {sort._sort === "id" && (
                  <>
                    {sort._order === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4 inline" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 inline" />
                    )}
                  </>
                )}
              </th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-center">Qty</th>
              <th className="py-3 px-6 text-center">Amt</th>
              <th
                className="py-3 px-6 text-left cursor-pointer flex items-center justify-center"
                onClick={(e) =>
                  handleSort({
                    sort: "totalAmount",
                    order: sort._order === "asc" ? "desc" : "asc",
                  })
                }
              >
                Total Amt:
                {sort._sort === "totalAmount" && (
                  <>
                    {sort._order === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4 inline" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 inline" />
                    )}
                  </>
                )}
              </th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Address</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders &&
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-8 text-center text-lg">{order.id}</td>
                  <td className="py-3 px-6 text-left">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-14 h-14 rounded-lg"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                        </div>
                        <span>{item.title}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-1">
                        <NumericFormat
                          value={item.quantity}
                          displayType={"text"}
                          suffix=" Items"
                          thousandSeparator
                        />
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-1">
                        <NumericFormat
                          value={discountedPrice(item) * item.quantity}
                          displayType={"text"}
                          prefix="$ "
                          thousandSeparator
                        />
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <NumericFormat
                      value={order.totalAmount}
                      displayType={"text"}
                      prefix="$ "
                      thousandSeparator
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    {editableOrderId === order.id ? (
                      <div className="flex">
                        <select
                          className={`py-1 px-3 rounded-full text-xs ${getStatusColor(
                            order.status + "Edit"
                          )}`}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusUpdate(e.target.value, order)
                          }
                        >
                          <option
                            value="Pending"
                            className="bg-yellow-200 text-yellow-600"
                          >
                            Pending
                          </option>
                          <option
                            value="Dispatched"
                            className="bg-blue-200 text-blue-600"
                          >
                            Dispatched
                          </option>
                          <option
                            value="Delivered"
                            className="bg-green-200 text-green-600"
                          >
                            Delivered
                          </option>
                          <option
                            value="Cancelled"
                            className="bg-red-200 text-red-600"
                          >
                            Cancelled
                          </option>
                        </select>
                        <XMarkIcon
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => seteditableOrderId(null)}
                        />
                      </div>
                    ) : (
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="text-left">
                      <strong className="font-bold">Name:</strong>
                      {order.selectedAddress.name}
                    </div>
                    <div className="text-left break-all">
                      <strong className="font-bold">Address:</strong>
                    </div>
                    <div className="text-left break-all">
                      {order.selectedAddress.street}
                    </div>
                    <div className="text-left break-all">
                      {order.selectedAddress.city}
                    </div>
                    <div className="text-left break-all">
                      {order.selectedAddress.state}
                    </div>
                    <div className="text-left break-all">
                      {order.selectedAddress.pinCode}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                        <PencilIcon
                          className="w-6 h-6"
                          onClick={(e) => handleEdit(order)}
                        />
                      </div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                        <EyeIcon
                          className="w-6 h-6"
                          onClick={(e) => handleShow(order)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <section className="flex items-center  bg-white ">
          <div className="w-full max-w-full  ">
            {/* Start coding here */}
            <div className="relative overflow-hidden bg-white rounded-b-lg shadow-md px-4">
              <nav
                className="flex flex-col items-start justify-between py-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                aria-label="Table navigation"
              >
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={(e) => {
                      return setPage(page - 1);
                    }}
                    disabled={page <= 1}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                      page <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    disabled={page >= Math.ceil(totalOrders / ITEMS_PER_PAGE)}
                    onClick={(e) => {
                      return setPage(page + 1);
                    }}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                      page >= Math.ceil(totalOrders / ITEMS_PER_PAGE)
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(page - 1) * ITEMS_PER_PAGE + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {page * ITEMS_PER_PAGE > totalOrders
                          ? totalOrders
                          : page * ITEMS_PER_PAGE}
                      </span>{" "}
                      of <span className="font-medium">{totalOrders}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        disabled={page <= 1}
                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                          page <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={(e) => {
                          return setPage(page - 1);
                        }}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>

                      {Array.from({
                        length: Math.ceil(totalOrders / ITEMS_PER_PAGE),
                      }).map((el, index) => (
                        <div
                          key={index}
                          onClick={(e) => setPage(index + 1)}
                          aria-current="page"
                          className={`relative z-10 inline-flex items-center ${
                            index + 1 === page
                              ? "bg-indigo-600 text-white"
                              : "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          } cursor-pointer px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                          {index + 1}
                        </div>
                      ))}

                      <button
                        disabled={
                          page >= Math.ceil(totalOrders / ITEMS_PER_PAGE)
                        }
                        onClick={(e) => {
                          return setPage(page + 1);
                        }}
                        // Desktop
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                          page >= Math.ceil(totalOrders / ITEMS_PER_PAGE)
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminOrders;
