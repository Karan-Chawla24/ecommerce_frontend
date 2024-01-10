import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp.jsx";
import { Toaster } from "react-hot-toast";
import store from "./utils/store.js";
import { Provider } from "react-redux";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import Products from "./components/Products.jsx";
import Navbar from "./components/Navbar.jsx";
import Landing from "./components/Landing.jsx";
import Cart from "./components/Cart.jsx";
import Profile from "./components/Profile.jsx";

export const server = "https://ecommerce-service-pn5w.onrender.com/api/v1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/getallproducts",
    element: [<Products />, <Navbar />],
  },
  {
    path: "/product/:id",
    element: [<Landing />, <Navbar />],
  },
  {
    path: "/cart",
    element: [<Cart />, <Navbar />],
  },
  {
    path: "/paymentsuccess/:reference_id",
    element: <PaymentSuccess />
  },
  {
    path: "/profile",
    element: [<Profile />,<Navbar />]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
  </Provider>
);
