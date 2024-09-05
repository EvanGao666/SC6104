import React from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ account, balance }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/value">
                    Set/Get Value
                </Button>
                <Button color="inherit" component={Link} to="/transfer">
                    Transfer
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Tooltip
                    title={`Account: ${account}\nBalance: ${balance} ETH`}
                    arrow
                >
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
