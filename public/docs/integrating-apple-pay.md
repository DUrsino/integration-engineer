# Integrating Apple Pay

This document will guide you on how to correctly integrate Apple Pay via PowerBoard.

---

> 📘 **Before you begin**
>
> When sending requests to PowerBoard’s API, you must provide either a Public Key and/or Secret Key depending on your use case.
> API keys are generated via PowerBoard’s Merchant Dashboard:
>
> - Login to the PowerBoard Merchant Dashboard.
> - Go to ‘**My Company**’ > ‘**API and Security**’.
> - You'll find both Public and Secret Keys to use with the API.

> 🚧 **Third Party Requirements**
>
> Apple Pay must be connected in sandbox mode via PowerBoard Dashboard.
>
> Requirements:
> - Apple Pay Developer Account
> - Apple Pay Merchant ID & Certificate
> - Payment Processing Certificate & Private Key
> - Apple Pay sandbox wallet with test cards

Your integration will utilise:
- PowerBoard Client-SDK (Widget)
- PowerBoard REST API

---

## Step 1: Create a PowerBoard 'Wallet' Token (API)

**API Endpoint**  
`POST https://api.preproduction.powerboard.commbank.com.au/v1/charges/wallet`

**Headers:**

| Key                 | Value                    | Description                             |
|---------------------|--------------------------|-----------------------------------------|
| x-user-secret-key   | POWERBOARD_SECRET_KEY    | Your PowerBoard API Secret Key          |
| Content-Type        | application/json         | Always application/json                 |

**Request Parameters:**

| Field                               | Type   | Description                                 |
|-------------------------------------|--------|---------------------------------------------|
| amount                              | string | Total amount for the Apple Pay transaction  |
| currency                            | string | Always set to 'AUD'                         |
| reference                           | string | Reference for the transaction               |
| customer.first_name                 | string | Customer's first name                       |
| customer.last_name                  | string | Customer's last name                        |
| customer.email                      | string | Customer's email                            |
| customer.payment_source.gateway_id | string | Your CommWeb + Apple Pay service ID         |

```json
{
  "customer": {
    "payment_source": {
      "gateway_id": "61c1c7192dc2f86ba9fe6ed6"
    }
  },
  "meta": {
    "store_id": "123",
    "store_name": "Store 123"
  },
  "amount": 10,
  "reference": "reference123",
  "description": "description123",
  "currency": "AUD"
}
```

**Response:**
```json
{
  "status": 201,
  "resource": {
    "type": "charge",
    "data": {
      "token": "YOUR_WALLET_TOKEN"
    }
  }
}
```

---

## Step 2: Initialise the PowerBoard Widget

> ⚠️ Wallet tokens expire after 24 hours.

**Steps:**
- Embed the PowerBoard SDK
- Add widget container
- Use `preproduction_cba` environment
- Configure `cba.WalletButtons`

```html
<div id="widget-apple-Pay"></div>
<script src="https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script>
<script>
  let button = new cba.WalletButtons("#widget-apple-Pay", "YOUR_WALLET_TOKEN", {
    amount_label: "Payment Amount",
    country: "AU",
    wallets: ["apple"]
  });
  button.setEnv('preproduction_cba');
  button.onUnavailable(() => console.log("No wallet buttons available"));
  button.onPaymentSuccessful((data) => console.log("Payment Data", data));
  button.onPaymentError((data) => console.log("The payment was not successful"));
  button.onPaymentInReview((data) => console.log("The payment is in fraud review"));
  button.load();
</script>
```

### onPaymentSuccessful Response

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

---

## Shipping Information Update

After shipping updates, use `onUpdate(data)` to:
- Recalculate total
- Update shipping amount and options
- Use `POST charges/:id` for the update

Pre-authorization redacted address fields:
1. address_country
2. address_city
3. address_state
4. address_postcode

More info: [Apple docs](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment/1916097-shippingcontact)

---

## Apple Pay Button Styling

| button_style   |
|----------------|
| black          |
| white          |
| white-outline  |

| button_type    |
|----------------|
| add-money, buy, donate, order, pay, tip, etc. |

Example:
```js
style: {
  button_type: "pay",
  button_style: "white-outline"
}
```

---

## Test Cards

👍 [Apple Pay Test Cards](https://developer.apple.com/apple-pay/sandbox-testing/)
