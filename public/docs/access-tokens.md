# Access Tokens

📘 In this article, we’ll explore how to create new access tokens, deactivate old ones, and whitelist IPs for enhanced security and control.

---

## Add New Access Tokens

Access tokens are used in token-based authentication to allow users access to your account’s API or PowerBoard components. These tokens carry the necessary permissions for defined functions and time periods and can be deactivated when no longer needed.

How they work:
- A user logs in and is issued an access token.
- The token is passed as a credential to call PowerBoard’s APIs or components.
- The token authorizes the user to access and perform specific actions.

### To generate a new Access Token:

1. Go to **Profile menu** > **Access Tokens** > **Create New**.
2. Select required **permissions**, give the token a **Label**, and set the **expiry date/time** under **Expire In**. Leave blank for indefinite access.
3. Optionally, whitelist:
   - **Domains** (UI-only access)
   - **IP Addresses** (API + UI access)
4. Click **Create**.
5. **Copy the token immediately** — it won’t be available again.

![Add Access Token](https://files.readme.io/62e056b-image.png)

---

## Deactivate Access Tokens

To disable a token:

1. Go to **Profile menu** > **Access Tokens**.
2. Click **Actions** > **Deactivate Permanently**.

Or, under **Recent Authentications**, you can click **Deactivate** to expire temporary login tokens (which auto-expire after 3 hours).

![Deactivate Access Token](https://files.readme.io/88ef0d3-image.png)

---

## Whitelist IPs

Whitelisting IPs ensures only specific devices/networks can access your account.

### To whitelist IP addresses:

1. Go to **Profile menu** > **My Company** > **Security**.
2. Enter the **IP address** and choose the number of **bits to check** (each octet = 8 bits).

![IP Address Example](https://files.readme.io/1aa74cf-IPv4_address_in_dotted-decimal_notation.png)

3. Click **Save**.
4. Use the **+ / -** buttons to add/remove additional IPs.

![IP Whitelisting](https://files.readme.io/b875ab2-image.png)

> ⚠️ **Note:** Avoid IP allowlisting if your company relies heavily on VPNs or fluctuating IP locations.

---

## FAQs

### ❓ Is there a way to retrieve the Access Token after creation?

Unfortunately, no. Once a token is created, it cannot be retrieved again. You must deactivate it and generate a new one.

### ❓ Can I invite multiple users at once?

No, each user must be invited individually with their specific role assigned.

### ❓ Does the invitation link expire?

Yes. Invitation links expire after **72 hours**. After that, the user will see _“This invitation link is broken”_. The administrator must resend the invite via the [Users section](/docs/users).
