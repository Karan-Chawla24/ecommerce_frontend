import React, { useEffect, useMemo, useState } from "react";
import {
  addToCart,
  checkoutHandler,
  getCartItems,
  removeProduct,
} from "../utils/cart.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main.jsx";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);

  const getCartData = async () => {
    try {
      const data = await getCartItems();
      setCartData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
    // console.log("length", cartData[0].length);
  }, []);

  const calculateTotalCost = useMemo(() => {
    if (cartData && cartData[0]?.products) {
      return cartData[0].products.reduce(
        (total, product) => total + product.product.price * product.quantity,
        0
      );
    }
    return 0;
  }, [cartData]);

  useEffect(() => {
    const result = calculateTotalCost + 10;
    setTotalCost(result);
  }, [calculateTotalCost]);

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId);
      if (!data) {
        toast.error("failed to load data");
        return;
      }
      getCartData();
    } catch (error) {
      toast.error("Failed to update cart");
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const data = await removeProduct(productId);
      console.log("data new", data);
      if (!data) {
        toast.error("failed to load data");
        return;
      }
      getCartData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(`${server}/getkey`);
      const data = await checkoutHandler(totalCost);
      const {currentUserInfo} = data;
      const options = {
        key,
        amount: totalCost,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.order.id,
        callback_url: `${server}/paymentverification`,
        prefill: {
          name: currentUserInfo.name,
          email: currentUserInfo.email,
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
      toast.error("failed to do checkout");
    }
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-gray-100 mt-20">
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  {/* <h2 className="font-semibold text-2xl">3 Items</h2> */}
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Total
                  </h3>
                </div>
                {cartData &&
                  cartData[0].products.map((product, index) => (
                    <div
                      key={`${product.product._id}+${index}`}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img
                            className="h-24"
                            src={product.product.image}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {product.product.title}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {product.product.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <svg
                          onClick={() =>
                            handleRemoveFromCart(product.product._id)
                          }
                          className="fill-current text-gray-600 w-3 cursor-pointer"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>

                        <p className="mx-2 border text-center w-8">
                          {product.quantity}
                        </p>

                        <svg
                          onClick={() => handleAddToCart(product.product._id)}
                          className="fill-current text-gray-600 w-3 cursor-pointer"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        Rs. {product.product.price}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        Rs. {product.product.price * product.quantity}
                      </span>
                    </div>
                  ))}

                <Link
                  to={"/getAllProducts"}
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm">
                    <option>Standard shipping - Rs. 10.00</option>
                  </select>
                </div>
                <div className="py-10">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full"
                  />
                </div>
                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                  Apply
                </button>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>Rs. {totalCost}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
