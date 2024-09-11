import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import GetAppIcon from "@mui/icons-material/GetApp";

const ValueManager = ({ contract, account, setError }) => {
    const [value, setValue] = useState("");
    const [storedValue, setStoredValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSetValue = async () => {
        setLoading(true);
        try {
            await contract.methods.setValue(value).send({ from: account });
            setSuccess(true);
            setValue("");
        } catch (err) {
            setError("Failed to set value: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGetValue = async () => {
        setLoading(true);
        try {
            const result = await contract.methods.getValue().call();
            setStoredValue(result);
        } catch (err) {
            setError("Failed to get value: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 5,
                backgroundColor: "background.paper",
                borderRadius: 2,
                p: 4,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Set/Get Value
            </Typography>
            <TextField
                label="Enter value"
                variant="outlined"
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                    onClick={handleSetValue}
                    disabled={loading}
                    startIcon={
                        loading ? <CircularProgress size={20} /> : <SaveIcon />
                    }
                    sx={{ width: "48%" }}
                >
                    {loading ? "Setting..." : "Set Value"}
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleGetValue}
                    disabled={loading}
                    startIcon={
                        loading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <GetAppIcon />
                        )
                    }
                    sx={{ width: "48%" }}
                >
                    {loading ? "Getting..." : "Get Value"}
                </Button>
            </Box>
            {storedValue !== null && (
                <Typography align="center" variant="h6" sx={{ mt: 3 }}>
                    Stored Value: {storedValue}
                </Typography>
            )}
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Value set successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ValueManager;
