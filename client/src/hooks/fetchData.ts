import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const usefetchData = async (key: string) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/${key}`);
    return response.data.response[0].content;
  } catch (error: any) {
    toast.error(error.data.response.message);
    return "";
  }
};
