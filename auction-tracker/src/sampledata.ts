let sampleEbayItems = [
  {
    "id": 1,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/1234567890",
    "itemId": "1234567890",
    "title": "Apple iPhone 13 Pro - 128GB - Graphite",
    "currentPrice": 799.99,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T15:00:00.000Z",
    "endTime": "2025-06-26T19:00:00.000Z",
    "status": "active",
    "sellerFeedback": "22015",
    "sellerFeedbackPercentage": "97.8",
    "metadata": {
      "condition": "Used - Excellent",
      "imageUrl": "https://i.ebayimg.com/images/g/XrwAAOSwYfRnwhrP/s-l1600.webp",
      "additionalImages": [
        "https://i.ebayimg.com/images/g/iphone_side.jpg",
        "https://i.ebayimg.com/images/g/iphone_back.jpg"
      ],
      "sellerUsername": "techgear_store"
    }
  },
  {
    "id": 2,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/2345678901",
    "itemId": "2345678901",
    "title": "LEGO Star Wars Millennium Falcon Set",
    "currentPrice": 145.0,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:35:00.000Z",
    "endTime": "2025-06-25T02:45:00.000Z",
    "status": "active",
    "sellerFeedback": "3892",
    "sellerFeedbackPercentage": "100.0",
    "metadata": {
      "condition": "New",
      "imageUrl": "https://i.ebayimg.com/images/g/M-QAAeSwPxJobgQi/s-l1600.webp",
      "additionalImages": [],
      "sellerUsername": "brickmaster"
    }
  },
  {
    "id": 3,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/3456789012",
    "itemId": "3456789012",
    "title": "Sony WH-1000XM5 Noise-Canceling Headphones",
    "currentPrice": 289.99,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:37:00.000Z",
    "endTime": "2025-06-24T22:15:00.000Z",
    "status": "active",
    "sellerFeedback": "7523",
    "sellerFeedbackPercentage": "99.3",
    "metadata": {
      "condition": "Open Box",
      "imageUrl": "https://i.ebayimg.com/images/g/lRYAAeSw4jxobsRs/s-l1600.webp",
      "additionalImages": [
        "https://i.ebayimg.com/images/g/sony_accessories.jpg"
      ],
      "sellerUsername": "soundcentral"
    }
  },
  {
    "id": 4,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/4567890123",
    "itemId": "4567890123",
    "title": "Nintendo Switch OLED Model - White Joy-Con",
    "currentPrice": 349.99,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:40:00.000Z",
    "endTime": "2025-06-27T11:20:00.000Z",
    "status": "active",
    "sellerFeedback": "12874",
    "sellerFeedbackPercentage": "96.1",
    "metadata": {
      "condition": "Brand New",
      "imageUrl": "https://i.ebayimg.com/thumbs/images/g/Xv8AAeSwZbJocVVd/s-l500.jpg",
      "additionalImages": [
        "https://i.ebayimg.com/images/g/switch_box.jpg"
      ],
      "sellerUsername": "nintendodeals"
    }
  },
  {
    "id": 5,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/5678901234",
    "itemId": "5678901234",
    "title": "Dell XPS 13 Laptop - i7, 16GB RAM, 512GB SSD",
    "currentPrice": 999.0,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:42:00.000Z",
    "endTime": "2025-06-28T10:00:00.000Z",
    "status": "active",
    "sellerFeedback": "4530",
    "sellerFeedbackPercentage": "95.4",
    "metadata": {
      "condition": "Refurbished",
      "imageUrl": "https://i.ebayimg.com/images/g/a~sAAeSw5aVobiMs/s-l1600.webp",
      "additionalImages": [
        "https://i.ebayimg.com/images/g/xps_ports.jpg",
        "https://i.ebayimg.com/images/g/xps_keyboard.jpg"
      ],
      "sellerUsername": "refurbtechusa"
    }
  },
  {
    "id": 6,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/2345678901",
    "itemId": "2345678901",
    "title": "LEGO Star Wars Millennium Falcon Set",
    "currentPrice": 145.0,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:35:00.000Z",
    "endTime": "2025-06-25T02:45:00.000Z",
    "status": "active",
    "sellerFeedback": "3892",
    "sellerFeedbackPercentage": "100.0",
    "metadata": {
      "condition": "New",
      "imageUrl": "https://i.ebayimg.com/images/g/M-QAAeSwPxJobgQi/s-l1600.webp",
      "additionalImages": [],
      "sellerUsername": "brickmaster"
    }
  },
  {
    "id": 7,
    "userId": 101,
    "platform": "ebay",
    "itemUrl": "https://www.ebay.com/itm/2345678901",
    "itemId": "2345678901",
    "title": "LEGO Star Wars Millennium Falcon Set",
    "currentPrice": 145.0,
    "currencyVal": "USD",
    "lastChecked": "2025-06-21T14:35:00.000Z",
    "endTime": "2025-06-25T02:45:00.000Z",
    "status": "active",
    "sellerFeedback": "3892",
    "sellerFeedbackPercentage": "100.0",
    "metadata": {
      "condition": "New",
      "imageUrl": "https://i.ebayimg.com/images/g/M-QAAeSwPxJobgQi/s-l1600.webp",
      "additionalImages": [],
      "sellerUsername": "brickmaster"
    }
  },
]

export default sampleEbayItems