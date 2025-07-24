import dotenv from 'dotenv';

dotenv.config();

function getItemIdFromUrl(url: string): string | null {
  const match = url.match(/\/itm\/(\d{12})/);
  return match ? match[1] : null;
}

async function getEbayAuthToken() {
  const credentials = Buffer.from(`${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`).toString('base64');

  const res = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'https://api.ebay.com/oauth/api_scope'
    })
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Auth Token Error:", data);
    throw new Error(data.errors?.[0]?.message || 'Failed to get auth token');
  }
  return data.access_token;
}

async function fetchEbayItem(itemId: string, token: string) {
  console.log(`Fetching item with ID: ${itemId} using sandbox item_summary endpoint.`);
  const marketplaceId = 'EBAY_US';

  const res = await fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary?item_ids=${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-EBAY-C-MARKETPLACE-ID': marketplaceId
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error(`eBay API error (${res.status}):`, data);
    throw new Error(data.errors?.[0]?.message || 'Unknown error');
  }

  if (data.itemSummaries && data.itemSummaries.length > 0) {
    return data.itemSummaries[0];
  } else {
    throw new Error(`Item ID ${itemId} not found in item_summary response or no summaries returned.`);
  }
}

(async () => {
  const itemId = "110588006562"; // Must be an item you listed in sandbox!

  if (!itemId) {
    console.error('Missing item ID.');
    return;
  }

  console.log('Using Sandbox Item ID:', itemId);

  try {
    const token = await getEbayAuthToken();
    console.log('Obtained Sandbox Auth Token (first 10 chars):', token.substring(0, 10) + '...');
    const item = await fetchEbayItem(itemId, token);
    console.log('Sandbox Item details:', {
      title: item.title,
      price: item.price.value + ' ' + item.price.currency,
      seller: item.seller.username,
      condition: item.condition,
      itemWebUrl: item.itemWebUrl
    });
  } catch (error) {
    console.error('Error fetching sandbox item:', error);
  }
})();