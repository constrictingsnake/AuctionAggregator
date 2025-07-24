import {Box, Typography} from "@mui/material";
import ItemCard from "./ItemCard";
import { Link as RouterLink } from "react-router-dom";

const ListView = ({items}: {items: any[]}) => {
    return(
        <Box width="100%" display="flex" marginTop='1rem' flexWrap="wrap" gap={0}>
            <Box
            flexDirection="row"
            display="flex"
            sx={{
                backgroundColor: "lightgray",
                width: "100%",
                    height: "3rem",
                    alignItems: "center",
                    justifyContent: "space-between" 
            }}
            >
                <Box width="50%"> 
                        <Typography variant="body1">Title</Typography>
                    </Box>
                    <Box width="10%"> 
                        <Typography variant="body1">Current Price</Typography>
                    </Box>
                    <Box width="15%">
                        <Typography variant="body1">Seller</Typography>
                    </Box>
                    <Box width="15%">
                        <Typography variant="body1">End Time</Typography>
                    </Box>
                    <Box width="5%">
                        <Typography variant="body1">Status</Typography>
                    </Box>
            </Box>
            {items.map((item, index) => (
                <Box
                key={item.id}
                flexDirection="row"
                display="flex"
                sx={{
                    backgroundColor: index % 2 === 0? "white" : "lightgray",
                    width: "100%",
                    height: "3rem",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    color: "inherit"
                }}
                component={RouterLink} to="/item" state={{item}}
                >
                    <Box sx={{ width: "50%", flexShrink: 0, flexGrow: 0, overflow: "hidden" }}>
                        <Typography variant="body1">
                            {item.title.length > 80 ? item.title.substring(0, 80) + "..." : item.title}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "10%", flexShrink: 0, flexGrow: 0, overflow: "hidden" }}>
                        <Typography variant="body1">$ {item.currentPrice.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ width: "15%", flexShrink: 0, flexGrow: 0, overflow: "hidden" }}>
                        <Typography variant="body1">
                            {item.metadata.sellerUsername.length > 20
                                ? item.metadata.sellerUsername.substring(0, 20) + "..."
                                : item.metadata.sellerUsername}
                        </Typography>
                    </Box>
                    <Box sx={{ width: "15%", flexShrink: 0, flexGrow: 0, overflow: "hidden" }}>
                        <Typography variant="body1">{new Date(item.endTime).toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ width: "5%", flexShrink: 0, flexGrow: 0, overflow: "hidden" }}>
                        <Typography variant="body1">{item.status == "active"? "Active": "Ended"}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default ListView;