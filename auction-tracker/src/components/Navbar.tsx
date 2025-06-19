import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Light
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