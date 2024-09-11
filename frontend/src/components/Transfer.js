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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Transfer = ({ web3, account, setError }) => {
    const [transfers, setTransfers] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const valueInWei = web3.utils.toWei(amount, "ether");

            await web3.eth.sendTransaction({
                from: account,
                to: recipient,
                value: valueInWei,
            });

            const newTransfer = {
                recipient,
                amount,
                timestamp: new Date().toLocaleString(),
            };
            setTransfers((prevTransfers) => [newTransfer, ...prevTransfers]);
            setSuccess(true);
            setRecipient("");
            setAmount("");
        } catch (err) {
            setError("Failed to transfer.");
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
                                color="primary"
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
                                    "&:hover": {
                                        backgroundColor: "#1976d2",
                                    },
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
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Transfer successful!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Transfer;
