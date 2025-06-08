# Enabling Google Pay Service

This document will guide you on how to correctly enable Google Pay on PowerBoard.

***

> 📘 Before you begin
> 
> To enable Google Pay using your own merchant ID, you need to have:
> 
> - Google Developer Account
> - PowerBoard PreProduction and Production Accounts

> ❗️ Support
> 
> Please call PowerBoard Tech Support on 1800 230 177 options 1-3-1, Monday-Friday, 7am-7pm Australian Eastern Standard Time zone (GMT+10) or email the support team at [merchantsupport.powerboard@cba.com.au](mailto:merchantsupport.powerboard@cba.com.au) so that our team can assist you with the following steps.

***

## Step 1) Configure your Google Pay merchant ID via PowerBoard's API

> ❗️ Important
> 
> When enabling Apple and Google pay, the gateway API request must be include both wallet payment types. i.e. Both Apple and Google must be included if they're required

> 📘 Finding your gateway_id
> 
> You can get your gateway_id from PowerBoard Merchant Portal, under **Services**.

{
  "data": {
    "h-0": "**API Endpoint**",
    "h-1": "<https://api.preproduction.powerboard.commbank.com.au/v1/gateways/{{gateway_id}}>",
    "0-0": "**HTTP Method**",
    "0-1": "<div class=\"method-put\">PUT</div>",
    "1-0": "**Headers**",
    "1-1": "**x-user-secret-key**- POWERBOARD_SECRET_KEY - This is your PowerBoard API Secret Key.  \n**Content-Type** - application/json - Type will always be application/json.",
    "2-0": "**Path Parameters**",
    "2-1": "**gateway_id** - Your gateway idea found in the merchant portal",
    "3-0": "**Request Parameters**",
    "3-1": "**wallets.google.merchant** - string - Your google pay merchant ID"
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}

```json Sample Request Body

{
    "wallets": {
        "google": {
            "merchant": "YOUR_GOOGLE_MERCHANT_ID",
        }
    }
}
```