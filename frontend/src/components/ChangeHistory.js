import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Snackbar,
    Alert,
    useMediaQuery,
    useTheme,
    Grid,
} from "@mui/material";

const ChangeHistory = ({ contract }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile device

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const recordData = await contract.methods
                    .getChangeRecords()
                    .call();

                // Log the fetched data to inspect the structure
                console.log("Fetched records:", recordData);

                // Assuming newValue might be in BigInt format, convert it
                const processedRecords = recordData.map((record) => ({
                    ...record,
                    timestamp: Number(record.timestamp), // Convert BigInt to Number
                    newValue: Number(record.newValue), // Convert BigInt to Number, if applicable
                }));

                setRecords(processedRecords.reverse()); // Reverse to show latest first
                setSuccess(true); // Indicate successful data fetch
            } catch (err) {
                setError("Failed to fetch change history.");
                console.error("Error fetching records:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [contract]);

    return (
        <Box sx={{ maxWidth: "md", mx: "auto", mt: 5, mb: 5 }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: "error.main",
                        color: "error.contrastText",
                    }}
                >
                    <Typography>{error}</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TableContainer
                            component={Paper}
                            sx={{
                                maxWidth: "100%",
                                overflowY: "auto", // Enable vertical scroll
                                overflowX: "hidden", // Disable horizontal scroll
                                "& .MuiTableCell-root": {
                                    whiteSpace: "normal",
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                    maxWidth: "200px", // Adjust as necessary
                                },
                            }}
                        >
                            <Table size={isMobile ? "small" : "medium"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>New Value</TableCell>
                                        <TableCell>Timestamp</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {records.map((record, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {record.user || "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                {record.newValue || "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    record.timestamp * 1000
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )}

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
                    Records loaded successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ top: 0 }}
            >
                <Alert
                    onClose={() => setError("")}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChangeHistory;
