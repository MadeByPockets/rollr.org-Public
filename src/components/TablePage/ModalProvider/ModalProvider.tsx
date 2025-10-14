import React, { ReactNode, useState } from "react";
import { ModalContext } from './ModalContext';
import Modal from "@/components/shared/Modal";

type ModalProviderProps = {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<null | ReactNode>(null);

  const showModal = (content: ReactNode) => setModalContent(content);
  const hideModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent && (
        <Modal onClose={hideModal}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export default ModalProvider;