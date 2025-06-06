interface AuctionCardProps {

    // Item info
    itemName: string;
    linkTo: string;
    images: string[];
    description: string;
    currentbid: number;
    numberOfBids: number;
    shippingAndFees: number;

    // Seller info
    sellerName: string;
    sellerRating: number;
    sellerVerified: boolean;

    // Auction info
    pickup: string | null;
    delivery: string;
    

}