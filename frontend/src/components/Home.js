import React from "react";
import { Typography, Box, Grid, Paper, Button, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TimelineIcon from "@mui/icons-material/Timeline"; // Updated icon

const Feature = ({ icon, title, description, link }) => {
    const theme = useTheme(); // Get current theme
    const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is active

    return (
        <Grid item xs={12} md={6}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    border: `1px solid ${isDarkMode ? "#424242" : "#e0e0e0"}`,
                    backgroundColor: "background.paper",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {icon}
                    <Typography variant="h5" component="h3" sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
                    {description}
                </Typography>
                <Button
                    component={RouterLink}
                    to={link}
                    variant="contained"
                    fullWidth
                    sx={{
                        borderRadius: 50,
                        textTransform: "none",
                        fontWeight: "bold",
                        py: 1.5,
                        backgroundColor: isDarkMode ? "#fff" : "#000",
                        color: isDarkMode ? "#000" : "#fff",
                        "&:hover": {
                            backgroundColor: isDarkMode ? "#ddd" : "#333",
                        },
                    }}
                >
                    Try it out
                </Button>
            </Paper>
        </Grid>
    );
};

const Home = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark"; // Check if dark mode is active

    return (
        <Box sx={{ maxWidth: "lg", mx: "auto", mt: 8, mb: 4 }}>
            <Typography
                variant="h2"
                align="center"
                gutterBottom
                sx={{ fontWeight: 700, color: "text.primary" }}
            >
                Welcome to Ethereum DApp
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
                sx={{ maxWidth: 800, mx: "auto" }}
            >
                Experience the power of decentralized applications on the
                Ethereum blockchain.
            </Typography>
            <Grid container spacing={4}>
                <Feature
                    icon={
                        <AccountBalanceWalletIcon
                            fontSize="large"
                            sx={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                    }
                    title="Value Management"
                    description="Store and retrieve values securely on the Ethereum blockchain. Manage your data with ease and transparency."
                    link="/value"
                />
                <Feature
                    icon={
                        <SwapHorizIcon
                            fontSize="large"
                            sx={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                    }
                    title="Transfer Funds"
                    description="Seamlessly transfer Ethereum between accounts. Fast, secure, and decentralized transactions at your fingertips."
                    link="/transfer"
                />
                <Feature
                    icon={
                        <TimelineIcon
                            fontSize="large"
                            sx={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                    }
                    title="Value Change History"
                    description="Track the history of value changes on the Ethereum blockchain. Review past changes and manage your data effectively."
                    link="/history"
                />
            </Grid>
        </Box>
    );
};

export default Home;
