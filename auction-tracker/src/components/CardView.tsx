import { Box, Typography } from "@mui/material";
import ItemCard from "./ItemCard";
import { Link as RouterLink } from "react-router-dom";
const CardView = ({ items }: { items: any[] }) => {
  return (
      <Box width="100%" display="flex" marginTop='1rem' flexWrap="wrap" justifyContent="space-around" gap={2}>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "300px",
            height: "600px",
            flex: "0 0 auto",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textDecoration: "none",
            color: "inherit"
          }}
          component={RouterLink} to="/item" state={{item}}
        >
          <Box
            sx={{
              width: "100%",
              height: "400px",
              overflow: "hidden",
              mb: 2,
            }}
          >
            <Box
              component="img"
              src={item.metadata.imageUrl}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                
              }}
            />
          </Box>
          <Typography variant="h5">{item.title}</Typography>
          <Typography variant="h6">Seller: {item.metadata.sellerUsername}</Typography>
          
          <h1>Price: ${item.currentPrice.toFixed(2)}</h1>
        </Box>
      ))}
    </Box>
  );
};

export default CardView;