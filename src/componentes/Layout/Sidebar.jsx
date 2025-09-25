import { React, useContext } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { AuthContext } from "../../contexto/ContextoAuth";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
    const location = useLocation();
    const { cerrarSesion } = useContext(AuthContext);

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Tareas", icon: <EventNoteIcon />, path: "/tareas" },
    ];

    const drawer = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div>
                <Toolbar>
                    <ListItemIcon>
                        <img
                            src="/flower_icon.svg"
                            alt="Logo"
                            style={{ width: 24, height: 24 }}
                        />
                    </ListItemIcon>
                    <Typography color="primary" variant="h6" noWrap>
                        App de tareas
                    </Typography>
                </Toolbar>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            component={RouterLink}
                            to={item.path}
                            sx={{
                                bgcolor:
                                    location.pathname === item.path ? "primary.main" : "transparent",
                                color:
                                    location.pathname === item.path ? "white" : "primary.main",
                                borderRadius: 4,
                                "&:hover": {
                                    bgcolor:
                                        location.pathname === item.path
                                            ? "primary.dark"
                                            : "grey.100",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color:
                                        location.pathname === item.path ? "white" : "inherit",
                                    minWidth: 40,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </div>

            <Box sx={{ mt: "auto", mb: 2 }}>
                <List>
                    <ListItem
                        onClick={cerrarSesion}
                        sx={{
                            borderRadius: 4,
                            color: "primary.main",
                            "&:hover": {
                                bgcolor: "grey.100",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "primary.main", minWidth: 40 }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "white",
                        color: "black",
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "white",
                        color: "black",
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
