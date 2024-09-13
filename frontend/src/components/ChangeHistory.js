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
} from "@mui/material";

const ChangeHistory = ({ contract }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        <Box sx={{ p: 3 }}>
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
                <TableContainer component={Paper}>
                    <Table>
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
            )}
        </Box>
    );
};

export default ChangeHistory;
