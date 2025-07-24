import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    DVL - An Auction Tracker
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="">Dashboard</Button>
                    <Button color="inherit" component={RouterLink} to="/Account">Account</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;