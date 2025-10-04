import { createContext, ReactNode, useContext } from "react";

type ModalContextType = {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: (content: ReactNode) => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);