import axios from "axios";
import { server } from "../main";
// import { server } from "../../../src/main";

export const getCartItems = async () => {
  try {
    const { data } = await axios.get(`${server}/cart/getcart`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log("cartData", data.cartItems);
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
    console.log("postData", data);
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
    console.log("postData", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkoutHandler = async (amount) => {
  try {
    const {
      data,
    } = await axios.post(
      `${server}/checkout`,
      { amount },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data)  {
      throw new Error("Failed to remove item from cart");
    }
    // console.log("postData", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
