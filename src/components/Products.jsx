import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../main.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { setAuthentication } from "../utils/loginSlice";
import { addItem } from "../utils/cartSlice.js";
import { addToCart } from "../utils/cart.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.login.isAuthenticated);
  const localStorageValue = JSON.parse(localStorage.getItem("isAuthenticated"));

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${server}/product/getAllProducts`, {
        withCredentials: true,
      });
      setProducts(data.products);
      console.log(data.products);
      if (isLoggedIn) {
        toast.success(data.message);
      } else if (data.message.length === 0) {
        setAuthentication(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleAddToCart = async (productId) => {
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
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!localStorageValue) return <Navigate to={"/"} />;

  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Products</h1>
      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product, index) => (
          <div key={`${product._id}+${index}`}>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <Link to={"/product/" + product._id}>
                <img
                  src={product.image}
                  alt="Product"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
              </Link>
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.title}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.description}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    Rs. {product.price}
                  </p>
                  <div
                    className="ml-auto cursor-pointer"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-bag-plus"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                      />
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;
