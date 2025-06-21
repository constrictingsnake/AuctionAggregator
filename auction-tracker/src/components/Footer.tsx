import { Container, Typography, Box } from "@mui/material"

const Footer = () => {

    return (
        <>
            <Box component="footer" sx={{
                py: 2,
                px: 2,
                mt: "auto",
                backgroundColor: "pink",
                textAlign: "center",
            }}>
                <Container maxWidth="md">
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Light. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </>
    );

}

export default Footer;