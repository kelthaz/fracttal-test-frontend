// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#4789f3" }, // Azul brillante
            secondary: { main: "#1E3A8A" }, // Azul oscuro (sidebar)
            background: {
              default: "#F9FAFB", // Fondo general
              paper: "#FFFFFF", // Tarjetas y AppBar
            },
            text: {
              primary: "#111827",
              secondary: "#6B7280",
            },
          }
        : {
            primary: { main: "#4789f3" },
            secondary: { main: "#1E40AF" },
            background: {
              default: "#111827",
              paper: "#1F2937",
            },
            text: {
              primary: "#F9FAFB",
              secondary: "#D1D5DB",
            },
          }),
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', sans-serif",
      h6: { fontWeight: 600 },
      body1: { fontWeight: 400 },
      // etc.
    },
    
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "light" ? "#1E3A8A" : "#1F2937",
            color: "#FFFFFF",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#1F2937",
            color: mode === "light" ? "#111827" : "#F9FAFB",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });
