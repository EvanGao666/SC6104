import React from "react";
import { Typography, Box, Grid, Paper, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const Feature = ({ icon, title, description, link }) => (
    <Grid item xs={12} md={6}>
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
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
                color="primary"
                fullWidth
                sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                Try it out
            </Button>
        </Paper>
    </Grid>
);

const Home = () => {
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
                            color="primary"
                        />
                    }
                    title="Value Management"
                    description="Store and retrieve values securely on the Ethereum blockchain. Manage your data with ease and transparency."
                    link="/value"
                />
                <Feature
                    icon={<SwapHorizIcon fontSize="large" color="primary" />}
                    title="Transfer Funds"
                    description="Seamlessly transfer Ethereum between accounts. Fast, secure, and decentralized transactions at your fingertips."
                    link="/transfer"
                />
            </Grid>
        </Box>
    );
};

export default Home;
