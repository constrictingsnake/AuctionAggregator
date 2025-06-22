import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, RadioGroup, Rating, Slider, Switch } from "@mui/material";
import {Typography} from "@mui/material";
import React from "react";

function formatPrice(value: number) {
  return `$${value}`;
}

const Filter = () => {
    let min = 0;
    let max = 999;
    const [value, setValue] = React.useState<number[]>([min, max]);
    const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

    const[useCard, setViewType] = React.useState(true);
    const handleViewChange = () => {
        setViewType(!useCard)
    }
    return(
        <Box sx={{
            bgcolor: "#f5f5f5",
            maxWidth: "10vw",
            display: "flex",
            flexDirection: "column",
            marginTop: '1rem',

        }}>
            <Typography variant="h3"> Filters </Typography>
            <Box>
                <Typography variant="h6"> View </Typography>
                <FormControl>
                    <RadioGroup
                    aria-labelledby="radio-group"
                    name="view-group"
                    value={useCard}
                    onChange={handleViewChange}
                    >
                        <FormControlLabel value="Card View" control={<></>} label="Card View" />
                        <FormControlLabel value="List View" control={<></>} label="List View" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box>
                <Typography variant="h6">
                    Platform
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="eBay" />
                    <FormControlLabel control={<Checkbox />} label="Yahoo Japan Auctions" />
                </FormGroup>
            </Box>

            <Box>
                <Typography variant="h6">
                    Status
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Active" />
                    <FormControlLabel control={<Checkbox />} label="Ended" />
                </FormGroup>

            </Box>
            <Box>
                <Typography variant="h6">
                    Price Range
                </Typography>
                <Slider 
                    getAriaLabel={() => 'Price Range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={formatPrice}
                    min={min}
                    max={max}
                    step={1}
                    
                />
                <Typography variant="body2">
                    Selected: ${value[0]} – ${value[1]}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">
                    Seller Feedback
                </Typography>
                <Rating name="size-medium" defaultValue={4} />

            </Box>
        </Box>
    );
    


}

export default Filter