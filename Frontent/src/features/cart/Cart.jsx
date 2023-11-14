import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemsfromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { NumericFormat } from "react-number-format";
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (total, item) => item.price * item.quantity + total,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQualityChange = (e, item) => {
    if (e.target.value === "0") {
      dispatch(deleteItemsfromCartAsync(item.id));
    } else {
      dispatch(
        updateCartAsync({ ...item, quantity: parseInt(e.target.value) })
      );
    }
  };
  const handleRemove = (e, productId) => {
    dispatch(deleteItemsfromCartAsync(productId));
  };
  return (
    <>
      {items.length === 0 && <Navigate to="/" />}
      <div className="mx-auto max-w-7xl mt-12 bg-white px-4 sm:px-6 lg:px-8">
        <h1 className=" py-4 text-4xl font-bold tracking-tight text-gray-900">
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
                        <p className="ml-4">$ {product.price}</p>
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
            <Link
              to="/Checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
};

export default Cart;
