import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';

dotenv.config();

let ebayToken: string | null = null;
let ebayTokenExpiresAt = 0;

export async function getValidEbayToken(): Promise<string> {
    if (ebayToken && Date.now() < ebayTokenExpiresAt) {
        // Token is still valid → return cached token
        return ebayToken;
    }

    console.log('Fetching new eBay token...');

    const clientId = process.env.EBAY_CLIENT_ID!;
    const clientSecret = process.env.EBAY_CLIENT_SECRET!;

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(
            'https://api.ebay.com/identity/v1/oauth2/token',
            qs.stringify({
                grant_type: 'client_credentials',
                scope: 'https://api.ebay.com/oauth/api_scope'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${basicAuth}`
                }
            }
        );

        ebayToken = response.data.access_token;
        ebayTokenExpiresAt = Date.now() + response.data.expires_in * 1000;

        console.log('New eBay token fetched. Expires at:', new Date(ebayTokenExpiresAt).toISOString());

        return ebayToken as string;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error getting eBay token:', error.response?.data || error.message);
        } else {
            console.error('Error getting eBay token:', error);
        }
        throw new Error('Failed to get eBay token');
    }
}