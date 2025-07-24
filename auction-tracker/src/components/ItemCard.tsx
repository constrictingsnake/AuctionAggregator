import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ItemCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item} = location.state || {};
  return (
    <Box>
      <Typography>{item.title}</Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>
    </Box>

    
  );
};

export default ItemCard;