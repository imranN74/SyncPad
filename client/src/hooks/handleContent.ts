import { toast } from "react-toastify";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback } from "react";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useHandleContent = async (key: string, content: string) => {
  console.log(BACKEND_BASE_URL);
  try {
    await axios.post(`${BACKEND_BASE_URL}/handle/${key}`, {
      content: content,
    });
  } catch (error: any) {
    toast.error(error.data.response.message || "error syncing data");
  }
};

export const useDebounceContent = () => {
  const debouncedHandleContent = useCallback(
    debounce(async (key: string, content: string) => {
      await useHandleContent(key, content);
    }, 1000),
    []
  );
  return debouncedHandleContent;
};
