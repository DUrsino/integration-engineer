
# Refunds

This document will guide you on how to correctly integrate Refunds with PowerBoard API.

Payment refund is the process of transferring funds from your company account back to the customer. The funds will be returned to the payment method the payer used in the goods/service purchase. Refunds are linked to charge ID. We recommend associating the refund with its original charge, thus providing visibility to the Issuing Bank and the card schemes.

Refunds could be **fully or partially refunded**. A full refund equals 100% of the amount. A partial refund equals an amount up to the net.

Multiple refunds are allowed up to the full net amount that has been reached.

---

## Processing refunds via API

In the event that you need to Refund a (charge) transaction, you will need to use our refund API request to do this. 

You will need to identify the **ChargeID** from the original transaction in the API endpoint.

### API Endpoint
`POST https://api.preproduction.powerboard.commbank.com.au/v1/charges/{id}/refunds`

### Headers

- `x-user-secret-key`: `POWERBOARD_SECRET_KEY` – This is your PowerBoard API Secret Key.
- `Content-Type`: `application/json` – Content-Type will always be application/json.

### Path Parameters

- `id`: The ChargeID returned from the initial charge.

### Request Parameters

- `amount` (string): Amount to refund for the transaction (optional).
  - Supplying an amount allows you to refund a specific amount.
  - Omitting the amount refunds the full amount.

> ❗️ **Important to note**  
> `amount` is case-sensitive and must be in all lowercase in the request body, or PowerBoard will refund the full amount.

### Example Request Body

```json
{
    "amount": "100.00"
}
```

---

## Processing refunds via PowerBoard Dashboard

To process a Refund for an existing Charge:

1. Go to **Charges > View Mode > Actions > Refund Request** for the specified Charge. You can use the filter option or browse the list.
2. Refund charge

![Refund charge](https://files.readme.io/a384fd2-image.png)

3. Enter the **amount** you would like to refund. It can be either equal to or less than the original amount.  
   Click **Refund**.
