import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const ValueManager = ({ contract, account, setError }) => {
    const setValue = async () => {
        try {
            const value = document.getElementById("moneyInput").value;
            await contract.methods.setValue(value).send({ from: account });
        } catch (err) {
            setError("Failed to set value.");
        }
    };

    const getValue = async () => {
        try {
            const storedValue = await contract.methods.getValue().call();
            document.getElementById("storedValue").innerText =
                "Stored Value: " + storedValue;
        } catch (err) {
            setError("Failed to get value.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Set/Get Value
            </Typography>
            <TextField
                id="moneyInput"
                label="Enter value"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={setValue}
                    sx={{ width: "48%" }}
                >
                    Set Value
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={getValue}
                    sx={{ width: "48%" }}
                >
                    Get Value
                </Button>
            </Box>
            <Typography
                id="storedValue"
                align="center"
                variant="h6"
                sx={{ mt: 3 }}
            ></Typography>
        </Container>
    );
};

export default ValueManager;
