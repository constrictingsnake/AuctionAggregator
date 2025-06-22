import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: `'Roboto', 'Helvetica', 'Arial'`,
        h1: {
      fontSize: '3.5rem',     // ~56px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.75rem',    // ~44px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2.25rem',    // ~36px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',    // ~28px
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',     // ~24px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.25rem',    // ~20px
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',       // ~16px
    },
    body2: {
      fontSize: '0.875rem',   // ~14px
    },
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