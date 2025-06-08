# Fraud

3D Secure 2.0 EMV 3DS, also known as 3DS2 in the gateway, is the new version designed to enhance security in online purchases while providing frictionless checkouts to payers who are considered low risk by the Access Control Server (ACS). The ACS may determine the risk using information provided by ...

# 3D Secure 2.0

EMV 3DS, also known as 3DS2 in the gateway, is the new version designed to enhance security in online purchases while providing frictionless checkouts to payers who are considered low risk by the Access Control Server (ACS). 

The ACS may determine the risk using information provided by the merchant, browser fingerprinting, and/or previous interactions with the payer. The ACS subjects the payer to a challenge (for example, entering a PIN) only where additional verification is required to authenticate the payer thereby providing increased conversion rates. 

Supported authentication schemes include Mastercard SecureCode™, Verified by Visa™, American Express SafeKey™.

***

# Terminology

Here are some key terms that will be referenced throughout the 3DS integration documentation.

| Term                        | Description                                                                                                                                                                                                                 |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access Control Server (ACS) | A component that operates in the issuer domain, which verifies whether authentication is available for a card number and device type, and authenticates specific transactions.                                              |
| Frictionless Flow           | An authentication flow where the payer is not required to respond to a challenge because the ACS deems the payer as low risk.                                                                                               |
| Challenge Flow              | An authentication flow where the payer is redirected to the ACS and is required to respond to a challenge to identify themselves, because the ACS does not have sufficient payer information to deem the payer as low risk. |

***

# 3D-Secure Widget Status Summary

## authenticated

- **Summary:** 3D-Secure authentication was successful, token ID was generated and passed back to your application
- **Workflow:** Proceed with ingesting the token id and process the transaction accordingly. 

## not_authenticated

- **Summary:** 3D-Secure authentication was rejected and/or declined.
- **Workflow:** Do not proceed with the transaction.