import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: `'Roboto', 'Helvetica', 'Arial'`,
    }, 
    palette: {
        background: {
            default: 'white',
            paper: '#2fd08f'
        },
        text: {
            primary: '#000000',
            secondary: '#85bb65'
        },

    }
})

export default theme;