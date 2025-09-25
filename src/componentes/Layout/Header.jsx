import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { AuthContext } from "../../contexto/ContextoAuth";

const drawerWidth = 240;

export default function Header({ handleDrawerToggle }) {
  const { usuario } = useContext(AuthContext);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        color: "black",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography color="secondary" variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Bienvenido
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" color="textSecondary">
            {usuario?.name || "Invitado"}
          </Typography>
          <Avatar
            alt={usuario?.name || "Invitado"}
            src={usuario ? `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.name)}` : ""}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
