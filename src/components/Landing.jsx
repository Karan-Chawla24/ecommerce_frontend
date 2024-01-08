import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main.jsx";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../utils/cart.js";
import toast from "react-hot-toast";

const Landing = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  console.log(id);
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(`${server}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = async (productId) => {
    try {
        const data = await addToCart(productId);
        if (!data) {
          toast.error("failed to load data");
          return;
        }
        toast.success("product added to cart");
      } catch (error) {
        toast.error("Failed to update cart");
        console.log(error);
      }
  }

  useEffect(() => {
    singleProduct();
  }, [id]);

  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className="mt-5">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={product.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  ON SALE
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <p className="leading-relaxed">{product.description}.</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <button onClick={() => addToCartHandler(product._id)}>
                      {" "}
                      <span className="mr-3 p-2 rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200">
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Rs. {product.price}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Buy
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={"/getAllProducts"}
            className="flex font-semibold text-indigo-600 text-sm mt-10 justify-center mb-20"
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
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Landing;
