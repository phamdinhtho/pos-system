"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          POS System
        </Typography>
        <Button color="inherit">Đăng xuất</Button>
      </Toolbar>
    </AppBar>
  );
}
