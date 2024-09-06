import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ValueManager from "./components/ValueManager";
import Transfer from "./components/Transfer";
import { Container, CssBaseline, Alert } from "@mui/material";

export const CONTRACT_ADDRESS = SimpleStorage.address;
export const SimpleStorageABI = SimpleStorage.abi;

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null); // 添加余额状态
    const [error, setError] = useState("");

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
                    //
                    const contractInstance = new web3Instance.eth.Contract(
                        SimpleStorageABI,
                        CONTRACT_ADDRESS
                    );
                    setContract(contractInstance);
                    //
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);
                    // 获取余额
                    const balance = await web3Instance.eth.getBalance(
                        accounts[0]
                    );
                    setBalance(web3Instance.utils.fromWei(balance, "ether"));
                } catch (err) {
                    setError("Failed to initialize web3.");
                }
            } else {
                setError("Please install MetaMask!");
            }
        };
        init();
    }, []);

    return (
        <Router>
            <CssBaseline />
            <Navbar account={account} balance={balance} />
            <Container sx={{ mt: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
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
            </Container>
        </Router>
    );
};

export default App;
