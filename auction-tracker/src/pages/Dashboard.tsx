import { Box } from "@mui/material";
import {Typography} from "@mui/material";
import Filter from "../components/Filter";
const Dashboard = () => {

    return(
            <>
            <Box component="header" sx={{
                bgcolor: 'background.paper',
                minHeight: '8rem',
                
                }}
            >
            <Typography variant="h1" sx={{
                fontSize: '8rem',
                color:'white'
            }}>Dashboard</Typography>
            
            </Box>
            <Filter />
        
        </>
    );

}

export default Dashboard