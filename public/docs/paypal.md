# PayPal Integration Guide

This document provides a step-by-step guide on integrating PayPal (including Pay in 4) via PowerBoard.

---

## 🔑 Before You Begin

When sending requests to PowerBoard’s API, ensure you have either a **Public Key** or **Secret Key**. To retrieve your keys:

1. Log in to the PowerBoard Merchant Dashboard.
2. Navigate to **My Company > API and Settings**.
3. Copy your **Public Key** and **Secret Key**.
4. Make sure PayPal is connected as a service under **Merchant Portal > Services > Connected Services**.
5. Note your **gateway_id** from the same section.

## 🚧 Third-Party Requirements

- PayPal connected (sandbox mode) in PowerBoard Dashboard
- [PayPal Developer Account](https://developer.paypal.com/signup/)
- [PayPal Sandbox Personal Account](https://developer.paypal.com/tools/sandbox/)

---

## Components Used

- PowerBoard Client SDK (Widget)
- PowerBoard REST API

---

## Integration Steps

### Step 1: Create a Wallet Token (API)

**Endpoint:** `POST https://api.preproduction.powerboard.commbank.com.au/v1/charges/wallet`

**Headers:**
- `x-user-secret-key`: Your PowerBoard Secret Key
- `Content-Type`: `application/json`

**Body Example:**
```json
{
  "customer": {
    "payment_source": {
      "gateway_id": "63cf464542194166721498ec"
    }
  },
  "amount": "1.00",
  "currency": "AUD",
  "reference": "online sales"
}
```

**Successful Response:**
```json
{
  "status": 201,
  "resource": {
    "data": {
      "token": "YOUR_WALLET_TOKEN"
    }
  }
}
```

---

### Step 2: Initialise the PowerBoard Widget

Create a container and embed PowerBoard’s Client SDK:

```html
<div id="widget-paypal"></div>
<script src="https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script>
<script>
  let button = new cba.WalletButtons("#widget-paypal", "YOUR_WALLET_TOKEN", {
    amount_label: "Payment Amount",
    country: "AU",
    request_shipping: true,
    pay_later: true,
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'pill',
      tagline: false
    }
  });

  button.setEnv('preproduction_cba');
  button.onUnavailable(() => console.log("No wallet buttons available"));
  button.onPaymentSuccessful((data) => console.log("Payment Successful", data));
  button.onPaymentError((data) => console.log("Payment Failed", data));
  button.onPaymentInReview((data) => console.log("Payment in Review", data));
  button.load();
</script>
```

**Example Successful Payment Response:**
```json
{
  "status": 200,
  "resource": {
    "data": {
      "status": "complete",
      "amount": 100,
      "currency": "AUD"
    }
  }
}
```

---

## PayPal Customer Info Overwrite

If enabled via PowerBoard Dashboard, merchants can choose to overwrite the following fields with the PayPal wallet data:

- First Name
- Last Name
- Email
- Phone Number

---

## PayPal Pay in 4 Standalone

You can use the `standalone: true` flag to only show Pay in 4:

```html
<div id="widget-paypal"></div>
<script src="https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script>
<script>
  let button = new cba.WalletButtons("#widget-paypal", "YOUR_WALLET_TOKEN", {
    amount_label: "Payment Amount",
    country: "AU",
    request_shipping: true,
    standalone: true,
    pay_later: true,
    style: {
      layout: 'horizontal',
      color: 'gold',
      shape: 'pill',
      tagline: true,
      label: 'pay'
    }
  });

  button.setEnv('preproduction_cba');
  button.onUnavailable(() => console.log("No wallet buttons available"));
  button.onPaymentSuccessful((data) => console.log("Payment Successful", data));
  button.onPaymentError((data) => console.log("Payment Failed", data));
  button.onPaymentInReview((data) => console.log("Payment in Review", data));
  button.load();
</script>
```

---

## Result Screenshots

- **Charge Logs:**
  ![](https://files.readme.io/f8db22d-image.png)

- **Standalone Pay in 4 Button:**
  ![](https://files.readme.io/29ee8de-image.png)

- **Pay in 4 Learn More Modal:**
  ![](https://files.readme.io/a4f580d-image.png)
