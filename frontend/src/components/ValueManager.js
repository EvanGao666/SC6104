import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
    useTheme,
    Paper,
    alpha,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import GetAppIcon from "@mui/icons-material/GetApp";

const ValueManager = ({ contract, account, setError }) => {
    const [value, setValue] = useState("");
    const [storedValue, setStoredValue] = useState(null);
    const [settingLoading, setSettingLoading] = useState(false);
    const [gettingLoading, setGettingLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setErrorState] = useState("");
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const buttonStyle = {
        backgroundColor: isDarkMode ? "#ffffff" : "#000000",
        color: isDarkMode ? "#000000" : "#ffffff",
        "&:hover": {
            backgroundColor: isDarkMode
                ? alpha("#ffffff", 0.8)
                : alpha("#000000", 0.8),
        },
    };

    const handleSetValue = async () => {
        setSettingLoading(true);
        try {
            await contract.methods.setValue(value).send({ from: account });
            setSuccess(true);
            setValue("");
        } catch (err) {
            const errorMessage = "Failed to set value: " + err.message;
            setErrorState(errorMessage);
            setOpenErrorSnackbar(true);
        } finally {
            setSettingLoading(false);
        }
    };

    const handleGetValue = async () => {
        setGettingLoading(true);
        try {
            const result = await contract.methods.getValue().call();
            console.log("Fetched value:", result);
            setStoredValue(result.toString());
        } catch (err) {
            const errorMessage = "Failed to get value: " + err.message;
            setErrorState(errorMessage);
            setOpenErrorSnackbar(true);
        } finally {
            setGettingLoading(false);
        }
    };

    useEffect(() => {
        if (openErrorSnackbar) {
            const timer = setTimeout(() => {
                window.location.reload(); // Refresh the page
            }, 3000); // 3 seconds

            return () => clearTimeout(timer);
        }
    }, [openErrorSnackbar]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 5 }}>
                Set/Get Value
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    mt: 3,
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(10px)",
                }}
            >
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
                        onClick={handleSetValue}
                        disabled={settingLoading || gettingLoading}
                        startIcon={
                            settingLoading ? (
                                <CircularProgress size={20} />
                            ) : (
                                <SaveIcon />
                            )
                        }
                        sx={{
                            width: "48%",
                            ...buttonStyle,
                        }}
                    >
                        {settingLoading ? "Setting..." : "Set Value"}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleGetValue}
                        disabled={settingLoading || gettingLoading}
                        startIcon={
                            gettingLoading ? (
                                <CircularProgress size={20} />
                            ) : (
                                <GetAppIcon />
                            )
                        }
                        sx={{
                            width: "48%",
                            ...buttonStyle,
                        }}
                    >
                        {gettingLoading ? "Getting..." : "Get Value"}
                    </Button>
                </Box>
                {storedValue !== null && (
                    <Typography align="center" variant="h6" sx={{ mt: 3 }}>
                        Stored Value: {storedValue}
                    </Typography>
                )}
            </Paper>
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenErrorSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ top: 0 }}
            >
                <Alert
                    onClose={() => setOpenErrorSnackbar(false)}
                    severity="error"
                    sx={{
                        width: "100%",
                        bgcolor: theme.palette.error.main,
                        color: theme.palette.getContrastText(
                            theme.palette.error.main
                        ),
                    }}
                >
                    {error} - The page will refresh automatically in 3 seconds.
                </Alert>
            </Snackbar>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ top: 0 }}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{
                        width: "100%",
                        bgcolor: theme.palette.success.main,
                        color: theme.palette.getContrastText(
                            theme.palette.success.main
                        ),
                    }}
                >
                    Value set successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ValueManager;
