import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../utils/cart.js";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  const orderHistory = async () => {
    try {
      const data = await getOrderHistory();
      setOrderData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    orderHistory();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="bg-gray-100 mt-24">
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-full bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Order History</h1>
                </div>

                {orderData.orderHistory.slice().reverse().map((order) => (
                  <>
                    <div>
                      <h1 className="font-semibold text-2xl border-b pb-8">
                        <p>Order ID: {order.orderId}</p>
                        <p>Total Amount: {order.totalAmount + 10}</p>
                        <p>
                          Order Date:{" "}
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                      </h1>
                      <div className="flex mt-14 mb-5">
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
                    </div>
                    {order.products.map((product, index) => (
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
                          <p className="mx-2 border text-center w-8">
                            {product.quantity}
                          </p>
                        </div>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          Rs. {product.product.price}
                        </span>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          Rs. {product.product.price * product.quantity}
                        </span>
                      </div>
                    ))}
                    <hr />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
