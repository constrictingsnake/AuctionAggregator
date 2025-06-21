import { Box, ThemeProvider } from "@mui/material";
import theme from "../Theme";

const Dashboard = () => {

    return(
        <ThemeProvider theme={theme}>
            <Box component="header" sx={{
                bgcolor: 'background.paper',
                minHeight: '30vh',
                
                }}
            >
            <h1>This is the header for dashboard</h1>
            </Box>
        </ThemeProvider>
        
    );

}

export default Dashboard