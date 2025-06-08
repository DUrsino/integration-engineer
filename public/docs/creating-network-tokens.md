# Creating Network Tokens

Learn how to create a Network Token

# How to create Network Tokens

Once your registration with the schemes is complete you can begin using Network/Scheme Tokens right away. PowerBoard has implemented an "under the vault" configuration, meaning, once used, any existing or newly created vault token is automatically enrolled with the schemes and will be tokenised at a scheme level.

PowerBoard also has a series of API calls that allows you as the merchant to create, get and use network tokens.

## Creating Network Tokens

To have Network Tokens created 'Under the Vault' you will need to ensure that your PowerBoard account is configured to have Network Tokens enabled. Please refer to the 'How to register to use Network Tokens' portion of this guide to ensure you are correctly registered to use Network Tokens.

### Step 1) Create and Initialise the Widget as per our Card Payments Guide

See [Card Payments](https://powerboard.readme.io/reference/card-payments-no-3ds#step-1-creating-and-initialising-the-widget). Once you receive a One Time Token, move on to step 2

### Step 2) Convert a One-Time-Token into a Vault Token

Use the **payment_source** returned from the Widget in your API Tokenise request, see below example:

[block:parameters]
{
  "data": {
    "h-0": "API Endpoint",
    "h-1": "<https://api.preproduction.powerboard.commbank.com.au/v1/vault/payment_sources>",
    "0-0": "**HTTP Method**",
    "0-1": "<div class=\"method-post\">POST</div>",
    "1-0": "**Headers**",
    "1-1": "**x-user-secret-key**- POWERBOARD_SECRET_KEY - This is your PowerBoard API Secret Key.  \n**Content-Type** - application/json - Content-Type will always be application/json.",
    "2-0": "**Request Parameters**",
    "2-1": "**token** - _string_ - payment source string returned from the widget following the \"finish\" event. _Example_: \"payment_source\": \"251985e6-a368-4168-8e1a-bfb30c3e4bab\""
  },
  "cols": 2,
  "rows": 3,
  "align": [
    "left",
    "left"
  ]
}
[/block]


Once you have submitted your API Tokenisation request, PowerBoard will respond accordingly with a 201 Created. The response should be stored against your database or relevant payments ecosystem.

```json Request Body
{
    "token": "8fb76d51-85dd-4de0-bbfa-44cd3dd35123"
}
```
```json Response Body

{
    "status": 201,
    "error": null,
    "resource": {
        "type": "payment_source",
        "data": {
            "vault_token": "8a70bdbd-c7be-4315-9cd4-a893406ae123",
            "type": "card",
            "company_id": "67edcaa991d91e4ed9329d77",
            "card_name": "Test User",
            "card_number_last4": "4590",
            "card_number_bin": "22226904",
            "card_scheme": "mastercard",
            "status": "active",
            "expire_month": 1,
            "expire_year": 2030,
            "created_at": "2025-05-05T23:42:44.277Z",
            "updated_at": "2025-05-05T23:44:08.081Z",
            "_source_ip_address": "10.0.37.29",
            "vault_type": "permanent"
        }
    }
}
```

When the token is created successfully you will receive a 201 response. We recommend storing the returned 'vault_token' for the next step and for financial charges.

### Step 3) Perform a 'GET' request to validate if Network Token is active

Upon the creation of the Vault Token, a Network Token will be provisioned simultaneously. This can be confirmed by using the [GET Vault API](/reference/query-vault-tokens)  and observe if the "network_tokens' fields are populated and the status of the Network Token is set to 'Active'.

[block:parameters]
{
  "data": {
    "h-0": "API Endpoint",
    "h-1": "<https://api.staging.powerboard.commbank.com.au/v1/vault-tokens/YOUR_VAULT_TOKEN>",
    "0-0": "**HTTP Method**",
    "0-1": "<div class=\"method-post\">GET</div>",
    "1-0": "**Headers**",
    "1-1": "**x-user-secret-key**- POWERBOARD_SECRET_KEY - This is your PowerBoard API Secret Key.  \n**Content-Type** - application/json - Content-Type will always be application/json."
  },
  "cols": 2,
  "rows": 2,
  "align": [
    "left",
    "left"
  ]
}
[/block]


```json Response Body
{
    "status": 200,
    "error": null,
    "resource": {
        "type": "vault-tokens",
        "data": {
            "vault_token": "8fb76d51-85dd-4de0-bbfa-44cd3dd35123",
            "updated_at": "2025-04-23T09:49:22.673Z",
            "card_name": "MC Test",
            "expire_month": 1,
            "expire_year": 2030,
            "card_number_last4": "4590",
            "card_scheme": "mastercard",
            "status": "active",
            "created_at": "2025-04-23T09:45:42.252Z",
            "company_id": "67edcaa991d91e4ed9329d77",
            "_source_ip_address": "130.41.60.229",
            "type": "card",
            "vault_type": "permanent",
            "card_number_bin": "22226904",
            "data_source": "stored",
            "payment_account_reference": "500145V5IBCDHG4DGIE6B15RVSIAU",
            "network_tokens": [
                {
                    "_id": "6808b6c8455682b4ed10fba2",
                    "default": true,
                    "expire_month": "05",
                    "expire_year": "2028",
                    "external_id": "MqHE9D-NQNmZM_xvUu3ZiQ000000000000GB",
                    "service_specific_description": null,
                    "status": "active",
                    "token": "5186151968584207"
                }
            ]
        }
    }
}
```

Once you have confirmed that the Network Token is active. You can now perform a charge or create a subscription using the previously returned 'vault_token'.