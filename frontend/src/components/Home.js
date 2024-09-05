import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
    return (
        <Container>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to Ethereum DApp
                </Typography>
                <Typography variant="body1" align="center">
                    Choose a functionality from the navbar to continue.
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
