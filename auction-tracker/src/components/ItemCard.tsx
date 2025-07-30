import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Image } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item} = location.state || {};
  let images: any[] = [];
  let itemLink: string = "";
  let platform: string = "";
  if (item.platform === "ebay") {
    images = [item.metadata.imageUrl, ...item.metadata.additionalImages];
    itemLink = "https://www.ebay.com/itm/" + item.itemId;
    platform = "eBay"
  }
  
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: true,
    

  };

  const [timeLeft, setTimeLeft] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      const endTime = new Date(item.endTime).getTime();
      const now = Date.now();

      const diff = endTime - now;

      if(diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(interval);
        return;
      }

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor((diff / (1000 * 60 * 60 * 24)));

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [item.endTime]);

  return (
    <>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Dashboard
      </Button>
      <Box id="container" display="flex" 
        flexDirection={{ xs: "column", md: "row" }}
        sx={{ width: "100%", height: "100%", alignItems: "flex-start", marginTop: "1rem"}}>

        <Box id="images" width={{ xs: "100%", md: "50%" }}
          sx={{
            position: "relative", // needed for absolute positioning inside
            ".slick-prev": {
              left: "10px", // move inside the box
              zIndex: 2
            },
            ".slick-next": {
              right: "10px", // move inside the box
              zIndex: 2
            },
            ".slick-prev:before, .slick-next:before": {
              color: "black", // make arrows visible
              fontSize: "28px"
            }
          }}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`slide-${index}`}
                  style={{
                    width: "100%",          // Always fit width of container
                    height: "auto",         // Maintain aspect ratio
                    maxHeight: "70vh",      // Prevent it from taking too much vertical space
                    objectFit: "contain",   // Avoid cropping
                    display: "block",
                    margin: "0 auto"
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
        <Box id="description" width={{ xs: "100%", md: "50%" }} sx={{ padding: "1rem" }}>
  {/* Title */}
  <Typography variant="h4" fontWeight="bold" gutterBottom>
    {item.title}
  </Typography>

  {/* Platform */}
  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
    Platform: {platform}
  </Typography>

  {/* Price */}
  <Typography variant="h3" fontWeight="bold" color="green" gutterBottom>
    ${item.currentPrice.toFixed(2)}
  </Typography>

  {/* Auction Info */}
  <Box sx={{ marginTop: "1rem" }}>
    <Typography variant="body1"><strong>Bid Count:</strong> {item.metadata.bid_count}</Typography>
    <Typography variant="body1"><strong>End Time:</strong> {new Date(item.endTime).toLocaleString()}</Typography>
    <Typography
      variant="body1"
      sx={{
        color: timeLeft === "Ended" ? "red" : "primary.main",
        fontWeight: "bold"
      }}
    >
      Time Remaining: {timeLeft}
    </Typography>
  </Box>

  {/* Condition */}
  <Box sx={{ marginTop: "1rem" }}>
    <Typography variant="body2" sx={{ border: "1px solid gray", borderRadius: "5px", padding: "4px 8px", display: "inline-block" }}>
      Condition: {item.metadata.condition}
    </Typography>
  </Box>

  {/* Seller Info */}
  <Box sx={{ marginTop: "1rem" }}>
    <Typography variant="body2" color="text.secondary">
      Seller: <strong>{item.metadata.sellerUsername}</strong> ({Number(item.sellerFeedbackPercentage).toFixed(2)}% from {item.sellerFeedback} ratings)
    </Typography>
  </Box>

  {/* Button */}
  <Button
    fullWidth
    size="large"
    variant="contained"
    sx={{
      backgroundColor: "#000",
      marginTop: "1.5rem",
      ":hover": { backgroundColor: "#333" }
    }}
    onClick={() => window.open(itemLink)}
  >
    View Item
  </Button>
</Box>


      </Box>

    </>
  );
};

export default ItemCard;