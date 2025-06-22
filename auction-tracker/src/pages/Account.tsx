import { Box } from "@mui/material";
import {Typography} from "@mui/material";

const Account = () => {

    return(

            <Box component="header" sx={{
                bgcolor: 'background.paper',
                minHeight: '8rem',
                
                }}
            >
            <Typography variant="h1" sx={{
                fontSize: '8rem',
                color:'white'
            }}>Account</Typography>
            </Box>

    );

};

export default Account