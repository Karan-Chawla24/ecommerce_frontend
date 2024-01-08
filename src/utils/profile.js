import axios from "axios";
import { server } from "../main";

export const getMyProfile = async () => {
  const { data } = await axios.get(`${server}/users/profile`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};
