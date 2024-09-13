import React, { useState } from "react";
import {
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Snackbar,
    Alert,
    useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Transfer = ({ web3, account, setError }) => {
    const [transfers, setTransfers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setErrorState] = useState(""); // New state for error message
    const [refreshing, setRefreshing] = useState(false); // New state for refreshing

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const buttonStyle = {
        backgroundColor: isDarkMode ? "#ffffff" : "#000000",
        color: isDarkMode ? "#000000" : "#ffffff",
        "&:hover": {
            backgroundColor: isDarkMode ? "#e0e0e0" : "#333333",
        },
    };

    const handleTransfer = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!web3 || !account) {
            setErrorState("Web3 or account not available.");
            return;
        }

        if (!recipient || !amount) {
            setErrorState("Recipient address and amount are required.");
            return;
        }

        setLoading(true);

        try {
            // Validate recipient address
            if (!web3.utils.isAddress(recipient)) {
                setErrorState("Invalid recipient address.");
                return;
            }

            const amountInWei = web3.utils.toWei(amount, "ether");
            const transaction = await web3.eth.sendTransaction({
                from: account,
                to: recipient,
                value: amountInWei,
            });

            // Update the transfers state with the new transfer
            const newTransfer = {
                recipient,
                amount,
                timestamp: new Date().toLocaleString(), // Current timestamp
            };
            setTransfers((prevTransfers) => [newTransfer, ...prevTransfers]);

            setSuccess(true);
        } catch (err) {
            let errorMessage = "Transaction failed.";
            if (err.message.includes("Invalid address")) {
                errorMessage = "Invalid recipient address.";
            } else if (err.message.includes("LocalWalletNotAvailableError")) {
                errorMessage =
                    "No wallet available. Please connect your wallet.";
            } else {
                errorMessage = `Transaction failed: ${err.message}`;
            }
            setErrorState(errorMessage);
            setRefreshing(true);
            setTimeout(() => {
                window.location.reload(); // Refresh the page after 3 seconds
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: "md", mx: "auto", mt: 5, mb: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Transfer Ether
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <form onSubmit={handleTransfer}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Recipient Address"
                                variant="outlined"
                                fullWidth
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount (ETH)"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                disabled={loading}
                                startIcon={
                                    loading ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <SendIcon />
                                    )
                                }
                                sx={{
                                    ...buttonStyle,
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                {loading ? "Transferring..." : "Transfer"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Transfer History
                </Typography>
                {transfers.length === 0 ? (
                    <Typography align="center">No transfers yet.</Typography>
                ) : (
                    <List>
                        {transfers.map((transfer, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={`To: ${transfer.recipient}`}
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Amount: {transfer.amount}{" "}
                                                    ETH
                                                </Typography>
                                                {" — "}
                                                {transfer.timestamp}
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < transfers.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>

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
                    sx={{ width: "100%" }}
                >
                    Transfer successful!
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setErrorState("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ top: 0 }}
            >
                <Alert
                    onClose={() => setErrorState("")}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {error}
                    {refreshing && <div>Refreshing page in 3 seconds...</div>}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Transfer;
