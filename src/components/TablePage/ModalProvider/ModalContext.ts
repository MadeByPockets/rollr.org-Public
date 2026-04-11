"use client"
import { createContext, ReactNode, useContext } from "react";

export type ModalOptions = {
  acceptText?: string;
  onAccept?: () => void;
}

type ModalContextType = {
  showModal: (content: ReactNode, title: string, options?: ModalOptions) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);