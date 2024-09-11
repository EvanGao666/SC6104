import React from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import EthereumIcon from "@mui/icons-material/Token";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    borderRadius: 20,
    textTransform: "none",
    fontWeight: "bold",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    marginLeft: theme.spacing(2),
}));

const Navbar = ({ account, balance }) => {
    const shortAccount = account
        ? `${account.slice(0, 6)}...${account.slice(-4)}`
        : "";

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <EthereumIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 0, marginRight: 4 }}>
                    Ethereum DApp
                </Typography>
                <StyledButton
                    color="inherit"
                    component={Link}
                    to="/"
                    startIcon={<HomeIcon />}
                >
                    Home
                </StyledButton>
                <StyledButton
                    color="inherit"
                    component={Link}
                    to="/value"
                    startIcon={<SettingsIcon />}
                >
                    Set/Get Value
                </StyledButton>
                <StyledButton
                    color="inherit"
                    component={Link}
                    to="/transfer"
                    startIcon={<SwapHorizIcon />}
                >
                    Transfer
                </StyledButton>
                <Box sx={{ flexGrow: 1 }} />
                <StyledChip icon={<AccountCircleIcon />} label={shortAccount} />
                <Tooltip
                    title={`Account: ${account}\nBalance: ${balance} ETH`}
                    arrow
                >
                    <StyledChip
                        icon={<EthereumIcon />}
                        label={`${parseFloat(balance).toFixed(4)} ETH`}
                    />
                </Tooltip>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Navbar;
