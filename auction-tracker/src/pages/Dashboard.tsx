import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import Filter from "../components/Filter";
import sampleEbayItems from "../sampledata";
import React from "react";
import CardView from "../components/CardView";
import ListView from "../components/ListView";
const Dashboard = () => {
    const YEN_TO_USD = 0.0064;

    const convertYenToUSD = (yen: number) => { return yen * YEN_TO_USD };

    let data = sampleEbayItems;
    let min = Infinity
    let max = -Infinity
    for (let item of data) {
        let us_val = item.currentPrice;
        if (item.currencyVal === "YEN") {
            us_val = convertYenToUSD(item.currentPrice);
        }
        if (us_val < min) {
            min = us_val;
        }
        if (us_val > max) {
            max = us_val;
        }

    }

    const [useCard, setUseCard] = React.useState(true);
    const [platforms, setPlatforms] = React.useState<string[]>(["ebay", "yahoo"]);
    const [status, setStatus] = React.useState<string[]>(["active", "ended"]);
    const [priceRange, setPriceRange] = React.useState<number[]>([min, max]);
    const [sellerFeedback, setSellerFeedback] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedItem, setSelectedItem] = React.useState(0);


    const filteredItems = data.filter(item => {
        const platformOk = platforms.includes(item.platform.toLowerCase());

        const statusOk = status.includes(item.status.toLowerCase());

        const usdPrice = item.currencyVal === "YEN"
            ? convertYenToUSD(item.currentPrice)
            : item.currentPrice;
        const priceOk = usdPrice >= priceRange[0] && usdPrice <= priceRange[1];

        const feedbackPercent = parseFloat(item.sellerFeedbackPercentage);
        const feedbackOk = feedbackPercent >= (sellerFeedback * 20);

        const searchQueryOK = searchQuery == "" || item.title.toLowerCase().includes(searchQuery.toLowerCase());

        return platformOk && statusOk && priceOk && feedbackOk && searchQueryOK;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (selectedItem) {
            case 1: // Price: Lowest First
                return (a.currencyVal === "YEN" ? convertYenToUSD(a.currentPrice) : a.currentPrice) -
                    (b.currencyVal === "YEN" ? convertYenToUSD(b.currentPrice) : b.currentPrice);

            case 2: // Price: Highest First
                return (b.currencyVal === "YEN" ? convertYenToUSD(b.currentPrice) : b.currentPrice) -
                    (a.currencyVal === "YEN" ? convertYenToUSD(a.currentPrice) : a.currentPrice);

            case 0: // Time: Ending Soonest
            default:
                return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
    });


    return (
        <>
            <Box component="header" sx={{
                bgcolor: 'black',
                minHeight: '8rem',

            }}
            >
                <Typography variant="h1" sx={{
                    fontSize: '8rem',
                    color: 'white'
                }}>Dashboard</Typography>

            </Box>
            <Box display="flex" flexDirection="row" gap={2} alignItems="flex-start">
                <Filter
                    useCard={useCard}
                    setUseCard={setUseCard}
                    platforms={platforms}
                    setPlatforms={setPlatforms}
                    status={status}
                    setStatus={setStatus}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sellerFeedback={sellerFeedback}
                    setSellerFeedback={setSellerFeedback}
                />
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        {/* Left: Button Group with spacing */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button size="large" variant="contained" sx={{ backgroundColor: "#000000" }}>Add Item</Button>
                            <Button size="large" variant="contained" sx={{ backgroundColor: "#000000" }}>Refresh</Button>
                        </Box>

                        {/* Right: Search bar */}
                        <Box sx={{ display: 'flex', gap: 2, marginTop: 0.7 }}>
                            <TextField
                                placeholder="Search"
                                variant="outlined"
                                size="medium"
                                sx={{ width: '200px' }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FormControl>
                                <InputLabel id="dropdown-label">Sort By</InputLabel>
                                <Select
                                    labelId="dropdown"
                                    value={selectedItem}
                                    label="Sort By"
                                    onChange={(e) => setSelectedItem(e.target.value)}
                                    size="medium"
                                    sx={{ width: '200px' }}
                                >
                                    <MenuItem value={0}>Time: Ending Soonest</MenuItem>
                                    <MenuItem value={1}>Price: Lowest First</MenuItem>
                                    <MenuItem value={2}>Price: Highest First</MenuItem>
                                </Select>
                            </FormControl>

                        </Box>

                    </Box>
                    {useCard ? <CardView items={sortedItems} /> : <ListView items={sortedItems} />}
                </Box>
            </Box>

        </>
    );

}

export default Dashboard