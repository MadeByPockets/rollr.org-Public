"use client";

import React, { ReactNode, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ModalContext, ModalOptions } from '@/components';
import {Box} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";

type ModalProviderProps = {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<null | ReactNode>(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<ModalOptions>({});

  const showModal = (content: ReactNode, title: string, opts?: ModalOptions) => {
    setModalContent(content);
    setTitle(title);
    setOptions(opts ?? {});
    setDisplayModal(true);
  }
  const hideModal = () => {
    setDisplayModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Dialog open={displayModal} onClose={hideModal}>
        <Box>
          <DialogTitle>{title}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={hideModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ pt: 5 }}>
          {modalContent}
        </DialogContent>
        {options.acceptText && (
          <DialogActions>
            <Button variant="contained" onClick={() => {  hideModal(); options.onAccept?.(); }}>
              {options.acceptText}
            </Button>
            <Button onClick={hideModal}>Cancel</Button>
          </DialogActions>
        )}
      </Dialog>
    </ModalContext.Provider>
  );
}

export default ModalProvider;