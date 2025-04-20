"use client";

import { Button as MuiButton, ButtonProps } from "@mui/material";

type CustomButtonProps = ButtonProps & {};

export default function Button(props: CustomButtonProps) {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      disableElevation
      {...props}
    />
  );
}
