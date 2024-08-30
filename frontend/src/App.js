import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import "./App.css"; // 导入 CSS 文件

export const CONTRACT_ADDRESS = SimpleStorage.address;
export const SimpleStorageABI = SimpleStorage.abi;

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(
                    Web3.givenProvider || "http://localhost:8545"
                );
                const contractInstance = new web3Instance.eth.Contract(
                    SimpleStorageABI,
                    CONTRACT_ADDRESS
                );
                setWeb3(web3Instance);
                setContract(contractInstance);
            } else {
                console.error("Please install MetaMask!");
            }
        };
        init();
    }, []);

    async function getValue() {
        if (contract) {
            const storedValue = await contract.methods.getValue().call();
            console.log("stored value " + storedValue);
            document.getElementById("storedValue").innerText =
                "Stored Value: " + storedValue;
        }
    }

    async function setValue() {
        if (web3 && contract) {
            const accounts = await web3.eth.getAccounts(); // 使用 web3.eth.getAccounts()
            const value = document.getElementById("moneyInput").value;
            console.log("value: " + value);
            console.log("accounts[0] " + accounts[0]);
            await contract.methods.setValue(value).send({ from: accounts[0] });
        }
    }

    return (
        <div className="container">
            <div className="content">
                <h2>Ethereum DApp</h2>
                <input
                    type="number"
                    id="moneyInput"
                    placeholder="Enter amount to store"
                />
                <button onClick={setValue}>Store Value</button>
                <button onClick={getValue}>Get Stored Value</button>
                <p id="storedValue"></p>
            </div>
        </div>
    );
};

export default App;
