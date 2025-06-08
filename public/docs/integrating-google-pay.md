# Integrating Google Pay

This guide outlines how to correctly integrate **Google Pay** via PowerBoard.

---

## Before You Begin

When sending requests to PowerBoard’s API, you must provide either a **Public Key** or **Secret Key**, depending on your use case.

API keys can be generated via the PowerBoard Merchant Dashboard:

1. Login to the PowerBoard Merchant Dashboard.
2. Click on **My Company** and navigate to **API and Security**.
3. Copy both your Public and Secret Keys.

### Third-Party Requirements

- Google Pay must be connected (sandbox mode) via the PowerBoard Dashboard:
  - [Google Pay Developer Account](https://developers.google.com/pay/api/web/overview#get-started)
  - [Google Pay Merchant ID](https://support.google.com/paymentscenter/answer/7163092?hl=en)

---

## Components Used

- PowerBoard Client-SDK (Widget)
- PowerBoard REST API

---

# Integration Steps

## Step 1: Create a PowerBoard Wallet Token (API)

**Endpoint:**  
`POST https://api.preproduction.powerboard.commbank.com.au/v1/charges/wallet`

### Headers

- `x-user-secret-key`: `POWERBOARD_SECRET_KEY`  
- `Content-Type`: `application/json`

### Request Body Example

```json
{
  "amount": 145,
  "reference": "reference",
  "description": "description",
  "currency": "AUD",
  "customer": {
    "email": "orchestration-testing@protonmail.com",
    "first_name": "Google Pay WalletButton",
    "last_name": "Citizen",
    "phone": "+5555555555",
    "payment_source": {
      "gateway_id": "YOUR GATEWAY ID",
      "address_line1": "asd1",
      "address_line2": "asd2",
      "address_line3": "asd3",
      "address_city": "city",
      "address_state": "state",
      "address_country": "US",
      "address_postcode": "12345"
    }
  }
}
```

### Sample Response

```json
{
  "status": 201,
  "error": null,
  "resource": {
    "type": "charge",
    "data": {
      "token": "YOUR_WALLET_TOKEN",
      "charge": {
        "_id": "63fd93c3d8e7552c56047752",
        "amount": 1,
        "currency": "AUD",
        "reference": "2023-02-28T05:40:18.905Z",
        "status": "wallet_initialized",
        "capture": true,
        "authorization": false,
        "one_off": true,
        "created_at": "2023-02-28T05:40:19.545Z",
        "updated_at": "2023-02-28T05:40:19.545Z",
        "customer": {
          "payment_source": {
            "type": "wallet",
            "gateway_id": "YOUR_GATEWAY_ID",
            "gateway_name": "CommWeb",
            "gateway_type": "MasterCard"
          }
        }
      }
    }
  }
}
```

---

## Step 2: Create and Initialise the PowerBoard Widget

> ⚠️ **Wallet Token Expiry**: Wallet tokens expire after 24 hours.

1. Embed the Client SDK in your HTML.
2. Create a container for the widget.
3. Set the environment to `preproduction_cba`.
4. Use the `cba.WalletButtons` class with required options and callbacks.
5. Load the widget.

### HTML + Script Example

```html
<div id="widget-google-Pay"></div>

<script src="https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script>

<script>
  let button = new cba.WalletButtons("#widget-google-Pay", "YOUR_WALLET_TOKEN", {
    amount_label: "Payment Amount",
    country: "AU",
    wallets: ["google"]
  });

  button.setEnv('preproduction_cba');
  button.onUnavailable(() => console.log("No wallet buttons available"));
  button.onPaymentSuccessful((data) => console.log('Payment Data', data));
  button.onPaymentError((data) => console.log("The payment was not successful"));
  button.onPaymentInReview((data) => console.log("The payment is on fraud review"));
  button.load();
</script>
```

### onPaymentSuccessful Callback Example

```json
{
  "event": "paymentSuccessful",
  "data": {
    "id": "640691b748533262f6508ef7",
    "amount": 1,
    "currency": "AUD",
    "status": "complete"
  }
}
```
