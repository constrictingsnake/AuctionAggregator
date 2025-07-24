import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, RadioGroup, Rating, Slider, Radio } from "@mui/material";
import {Typography} from "@mui/material";
import React from "react";


type FilterProps = {
  useCard: boolean;
  setUseCard: (val: boolean) => void;
  platforms: string[];
  setPlatforms: (val: string[]) => void;
  status: string[];
  setStatus: (val: string[]) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  sellerFeedback: number;
  setSellerFeedback: (val: number) => void;
};

const Filter: React.FC<FilterProps> = ({useCard, setUseCard, platforms, setPlatforms, status, setStatus, priceRange, setPriceRange, sellerFeedback, setSellerFeedback}) => {
    
    const handleViewChange = (_event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      setUseCard(value === "Card View");
    };

    const toggle = (value: any, array: any[], setArray: (arg0: any) => void) => {
        setArray(array.includes(value) ? array.filter((v: any) => v !== value) : [...array, value]);
    };

    return(
        <Box sx={{
            bgcolor: "#f5f5f5",
            maxWidth: "15vw",
            display: "flex",
            flexDirection: "column",
            marginTop: '1rem',
            p: 2,
            borderRadius: 2

        }}>
            <Typography variant="h3" gutterBottom> Filters </Typography>
            <Box>
                <Typography variant="h6"> View </Typography>
                <FormControl>
                    <RadioGroup
                    aria-labelledby="radio-group"
                    name="view-group"
                    value={useCard}
                    onChange={handleViewChange}
                    >
                        <FormControlLabel value="Card View" control={<Radio />} label="Card View" />
                        <FormControlLabel value="List View" control={<Radio />} label="List View" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6">
                    Platform
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={platforms.includes("ebay")} onChange={() => toggle("ebay", platforms, setPlatforms)} />}
                     label="eBay" />
                    <FormControlLabel control={<Checkbox checked={platforms.includes("yahoo")} onChange={() => toggle("yahoo", platforms, setPlatforms)} />}
                     label="Yahoo Japan Auctions" />
                </FormGroup>
            </Box>

            <Box>
                <Typography variant="h6">
                    Status
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={status.includes("active")} onChange={() => toggle("active", status, setStatus)} />}
                     label="Active" />
                    <FormControlLabel control={<Checkbox checked={status.includes("ended")} onChange={() => toggle("ended", status, setStatus)} />}
                     label="Ended" />
                </FormGroup>

            </Box>
            <Box mb={2}>
        <Typography variant="h6">Price Range</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newVal) => setPriceRange(newVal)}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
        <Typography variant="body2">
          Selected: ${priceRange[0]} – ${priceRange[1]}
        </Typography>
      </Box>
            <Box>
                <Typography variant="h6">
                    Seller Feedback
                </Typography>
                <Rating
                    name="seller-feedback"
                    value={sellerFeedback}
                    onChange={(_event, newValue) => {
                        if (newValue !== null) {
                            setSellerFeedback(newValue);
                        }
                    }}
                />

            </Box>
            
        </Box>
    );
    


}

export default Filter