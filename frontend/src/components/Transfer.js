import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Transfer = ({ web3, account, setError }) => {
    const [transfers, setTransfers] = useState([]);

    const transfer = async () => {
        try {
            const recipient = document.getElementById("recipientAddress").value;
            const amount = document.getElementById("transferAmount").value;
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
            setTransfers((prevTransfers) => [...prevTransfers, newTransfer]);
        } catch (err) {
            setError("Failed to transfer.");
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Transfer Ether
                </Typography>
                <TextField
                    id="recipientAddress"
                    label="Recipient Address"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    id="transferAmount"
                    label="Amount (ETH)"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={transfer}
                    sx={{ mb: 2 }}
                >
                    Transfer
                </Button>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Transfer History</Typography>
                    {transfers.length === 0 ? (
                        <Typography>No transfers yet.</Typography>
                    ) : (
                        transfers.map((transfer, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mt: 1,
                                    padding: 1,
                                    border: "1px solid #ccc",
                                }}
                            >
                                <Typography variant="body1">
                                    To: {transfer.recipient} | Amount:{" "}
                                    {transfer.amount} ETH | Time:{" "}
                                    {transfer.timestamp}
                                </Typography>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Transfer;
