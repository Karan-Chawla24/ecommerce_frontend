import React from "react";
import { Link, Navigate } from "react-router-dom";
import "../../src/App.css";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { setAuthentication } from "../utils/loginSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await axios.get(
        `${server}/users/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setAuthentication(false));
      <Navigate to={"/"} />;
      toast.success("logged out successfully");
    } catch (error) {
      console.log(error);
      dispatch(setAuthentication(true));
    }
  };

  return (
    <header>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
          <a className="logo" href="#">
            <h3 className="font-bold text-2xl">
              <div class="bg-slate-700 text-white py-2 px-4 rounded-full text-lg font-semibold shadow-lg cursor-default">
                Natural Shop
              </div>
            </h3>
          </a>
          <input type="checkbox" id="check" />

          <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/getAllProducts"}>Products</Link>
            </li>
            <li>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li>
              <Link onClick={logoutHandler} to={"/"}>
                Logout
              </Link>
            </li>

            <label htmlFor="check" className="close-menu">
              X
            </label>
          </span>

          <label htmlFor="check" className="open-menu">
            Menu
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
