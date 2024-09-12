import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ValueManager from "./components/ValueManager";
import Transfer from "./components/Transfer";
import {
    Container,
    CssBaseline,
    Alert,
    ThemeProvider,
    createTheme,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";

export const CONTRACT_ADDRESS = SimpleStorage.address;
export const SimpleStorageABI = SimpleStorage.abi;

// 创建自定义主题
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // 主色调为蓝色
        },
        secondary: {
            main: "#dc004e", // 辅助色调为红色
        },
        background: {
            default: "#ffffff", // 背景色为白色
        },
    },
    typography: {
        fontFamily: "'Arial', serif", // 字体为Arial
        h1: {
            fontWeight: 700, // 增强标题的粗体感
            fontSize: "2.5rem", // 增大h1标题的大小
        },
        h6: {
            fontWeight: 600, // 增强副标题的粗体感
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50, // 按钮有圆形边角
                    padding: "12px 24px", // 更加突出按钮的大小
                    textTransform: "none", // 让按钮的文字保持原样式
                    transition: "background-color 0.3s, transform 0.3s", // 动画效果
                    "&:hover": {
                        backgroundColor: "#1565c0", // 鼠标悬停时的背景颜色
                        transform: "scale(1.05)", // 鼠标悬停时的缩放效果
                    },
                },
            },
        },
    },
});

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const contractInstance = new web3Instance.eth.Contract(
                        SimpleStorageABI,
                        CONTRACT_ADDRESS
                    );
                    setContract(contractInstance);

                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const balance = await web3Instance.eth.getBalance(
                        accounts[0]
                    );
                    setBalance(web3Instance.utils.fromWei(balance, "ether"));
                } catch (err) {
                    setError("Failed to initialize web3.");
                } finally {
                    setLoading(false);
                }
            } else {
                setError("Please install MetaMask!");
                setLoading(false);
            }
        };
        init();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        backgroundColor: "background.default", // 使用主题中的背景色
                        backgroundImage:
                            "linear-gradient(135deg, #ffffff, #f5f5f5)", // 使用渐变背景
                    }}
                >
                    <Navbar account={account} balance={balance} />
                    <Container
                        sx={{
                            mt: 4,
                            mb: 4,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {loading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {error && (
                                    <Alert
                                        severity="error"
                                        sx={{ mb: 2, width: "100%" }}
                                    >
                                        {error}
                                    </Alert>
                                )}
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
                                </Routes>
                            </>
                        )}
                    </Container>
                    <Box
                        component="footer"
                        sx={{
                            py: 3,
                            px: 2,
                            mt: "auto",
                            backgroundColor: "primary.main",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            © 2024 Group 4 's DApp
                        </Typography>
                        <Typography variant="body2" fontStyle="italic">
                            Empowering decentralized applications
                        </Typography>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};

export default App;
