import axios from "axios";
import { server } from "../main";

export const getCartItems = async () => {
  try {
    const { data } = await axios.get(`${server}/cart/getcart`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data.cartItems;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (productId) => {
  try {
    const { data } = await axios.post(
      `${server}/cart/add`,
      { productId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data) {
      throw new Error("Failed to add item to cart");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (productId) => {
  try {
    const { data } = await axios.delete(`${server}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (!data) {
      throw new Error("Failed to remove item from cart");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkoutHandler = async (amount) => {
  try {
    const { data } = await axios.post(
      `${server}/checkout`,
      { amount },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data) {
      throw new Error("Failed to remove item from cart");
    }
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getOrderHistory = async () => {
  try {
    const { data } = await axios.get(`${server}/orderhistory`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("order", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
