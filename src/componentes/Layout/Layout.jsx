import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 240;

export default function Layout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    bgcolor: "#f9fafb",
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
