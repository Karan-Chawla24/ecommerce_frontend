import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../main.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthentication } from "../utils/loginSlice.js";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setAuthentication(true));
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuthentication(false);
      setUserData({
        name: "",
        email: "",
        password: "",
      });
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/getallproducts"} />;

  return (
    <form method="post" onSubmit={submitHandler}>
      {console.log("Login called")}
      <div className="signup-1 flex items-center relative h-screen">
        <div className="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
            <div className="box bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-indigo-600">
              <h2 className="text-3xl text-gray-800 text-center">Login</h2>

              <div className="signup-form mt-6 md:mt-12">
                <div className="border-2 border-solid rounded flex items-center mb-4">
                  <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span className="far fa-envelope text-gray-500"></span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="h-10 py-1 pr-3 w-full"
                      name="email"
                      onChange={handleChange}
                      value={userData.email}
                    />
                  </div>
                </div>

                <div className="border-2 border-solid rounded flex items-center mb-4">
                  <div className="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span className="fas fa-asterisk text-gray-500"></span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="password"
                      placeholder="Password"
                      className="h-10 py-1 pr-3 w-full"
                      name="password"
                      onChange={handleChange}
                      value={userData.password}
                    />
                  </div>
                </div>

                <div className="text-center mt-6 md:mt-12">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                  >
                    Login <span className="far fa-paper-plane ml-2"></span>
                  </button>
                </div>
              </div>

              <div className="border-t border-solid mt-6 md:mt-12 pt-4">
                <p className="text-gray-500 text-center">
                  Create account,{" "}
                  <Link
                    to={"/signup"}
                    className="text-indigo-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
