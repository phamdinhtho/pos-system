"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
} from "@mui/material";

type CustomModalProps = DialogProps & {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  ...dialogProps
}: CustomModalProps) {
  return (
    <Dialog {...dialogProps}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {onClose && (
          <Button onClick={onClose} color="inherit">
            {cancelText}
          </Button>
        )}
        {onConfirm && (
          <Button onClick={onConfirm} color="primary" variant="contained">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
