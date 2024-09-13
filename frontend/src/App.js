import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ValueManager from "./components/ValueManager";
import Transfer from "./components/Transfer";
import ChangeHistory from "./components/ChangeHistory";
import {
    CssBaseline,
    ThemeProvider,
    createTheme,
    Box,
    Typography,
    CircularProgress,
    Paper,
    Grid,
    IconButton,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Button,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Menu as MenuIcon,
    SwapHoriz,
    Storage,
    Home as HomeIcon,
    Brightness4,
    Brightness7,
    AccountCircle,
    History, // Import History icon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const CONTRACT_ADDRESS = SimpleStorage.address;
export const SimpleStorageABI = SimpleStorage.abi;

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: darkMode ? "#90caf9" : "#1976d2" },
            secondary: { main: darkMode ? "#f48fb1" : "#dc004e" },
            background: {
                default: darkMode ? "#303030" : "#f5f5f5",
                paper: darkMode ? "#424242" : "#ffffff",
            },
        },
        typography: {
            fontFamily: "'Courier New',monospace",
            h1: { fontWeight: 700, fontSize: "2rem" },
            h6: { fontWeight: 600 },
        },
    });

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                initWeb3();
            } catch (err) {
                setError("Failed to connect to MetaMask.");
            }
        } else {
            setError("Please install MetaMask!");
        }
    };

    const initWeb3 = async () => {
        try {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            const contractInstance = new web3Instance.eth.Contract(
                SimpleStorageABI,
                CONTRACT_ADDRESS
            );
            setContract(contractInstance);
            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);
            await updateBalance(web3Instance, accounts[0]);
            setLoading(false);

            // Listen for account changes
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        } catch (err) {
            setError("Failed to initialize web3.");
            setLoading(false);
        }
    };

    const updateBalance = async (web3Instance, account) => {
        if (web3Instance) {
            const balance = await web3Instance.eth.getBalance(account);
            setBalance(web3Instance.utils.fromWei(balance, "ether"));
        }
    };

    const handleAccountsChanged = async (accounts) => {
        if (web3 && accounts.length > 0) {
            setAccount(accounts[0]);
            await updateBalance(web3, accounts[0]);
        } else {
            setAccount(null);
            setBalance(null);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            initWeb3();
        } else {
            setError("Please install MetaMask!");
            setLoading(false);
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                );
            }
        };
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleAccountMenuOpen = (event) => {
        setAccountMenuAnchor(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchor(null);
    };

    const switchAccount = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [{ eth_accounts: {} }],
            });
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            await updateBalance(web3, accounts[0]);
        } catch (err) {
            setError("Failed to switch account.");
        }
        handleAccountMenuClose();
    };

    const menuItems = [
        { text: "Dashboard", icon: <HomeIcon />, path: "/" },
        { text: "Manage Value", icon: <Storage />, path: "/value" },
        { text: "Transfer", icon: <SwapHoriz />, path: "/transfer" },
        { text: "Value Change History", icon: <History />, path: "/history" }, // Updated icon
    ];

    const Sidebar = () => (
        <Box sx={{ width: 240, flexShrink: 0 }}>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                    >
                        <ListItemIcon
                            sx={{ color: theme.palette.text.primary }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                                sx: { color: theme.palette.text.primary },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Box sx={{ display: "flex", minHeight: "100vh" }}>
                    {!isMobile && <Sidebar />}
                    <Drawer
                        anchor="left"
                        open={menuOpen && isMobile}
                        onClose={toggleMenu}
                    >
                        <Sidebar />
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {isMobile && (
                                <IconButton
                                    onClick={toggleMenu}
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Typography variant="h6">
                                Gao Yifan's DApp Dashboard
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    onClick={toggleDarkMode}
                                    color="inherit"
                                >
                                    {darkMode ? (
                                        <Brightness7 />
                                    ) : (
                                        <Brightness4 />
                                    )}
                                </IconButton>
                                {account ? (
                                    <>
                                        <Tooltip
                                            title={`Balance: ${parseFloat(
                                                balance
                                            ).toFixed(4)} ETH`}
                                            arrow
                                        >
                                            <IconButton
                                                sx={{ ml: 2 }}
                                                color="inherit"
                                                onClick={handleAccountMenuOpen}
                                            >
                                                <AccountCircle />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ ml: 1 }}
                                                >
                                                    {account.slice(0, 6)}...
                                                    {account.slice(-4)}
                                                </Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            anchorEl={accountMenuAnchor}
                                            open={Boolean(accountMenuAnchor)}
                                            onClose={handleAccountMenuClose}
                                        >
                                            <MenuItem onClick={switchAccount}>
                                                Switch Account
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={connectWallet}
                                        sx={{ ml: 2 }}
                                    >
                                        Connect Wallet
                                    </Button>
                                )}
                            </Box>
                        </Paper>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/value"
                                            element={
                                                <ValueManager
                                                    contract={contract}
                                                    account={account}
                                                    setError={setError}
                                                />
                                            }
                                        />
                                        <Route
                                            path="/transfer"
                                            element={
                                                <Transfer
                                                    web3={web3}
                                                    account={account}
                                                    setError={setError}
                                                />
                                            }
                                        />
                                        <Route
                                            path="/history"
                                            element={
                                                <ChangeHistory
                                                    contract={contract}
                                                />
                                            }
                                        />
                                    </Routes>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
