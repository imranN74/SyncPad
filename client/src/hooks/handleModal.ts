import { useState } from "react";

export const useHandleModal = (visibility: boolean) => {
  const [modalState, setModalState] = useState(visibility);
  return { modalState, setModalState };
};
