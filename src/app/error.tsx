"use client";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Lỗi xảy ra:", error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h5" color="error">
        Đã có lỗi xảy ra!
      </Typography>
      <Typography variant="body1">
        {error.message || "Không thể tải trang. Vui lòng thử lại."}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => reset()}>
        Thử lại
      </Button>
    </Box>
  );
}
