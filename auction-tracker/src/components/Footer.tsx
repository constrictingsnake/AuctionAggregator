import { Container, Typography, Box } from "@mui/material"

const Footer = () => {

    return (
        <>
            <Box component="footer" sx={{
                py: 2,
                px: 2,
                mt: "auto",
                backgroundColor: "black",
                textAlign: "center",
            }}>
                <Container maxWidth="md">
                    <Typography variant="body2" color="white">
                        © {new Date().getFullYear()} DVL. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    );

}

export default Footer;