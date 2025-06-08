# PowerBoard Test Cardss

Use the following test card numbers to simulate transactions when integrating with PowerBoard. These cards can be used to test both **3DSecure** and **Non-3DSecure** flows.

---

## 🔐 Non-3DSecure Cards

These cards do not trigger 3D Secure authentication.

| Scheme Brand | Card Number      | CVV  |
|--------------|------------------|------|
| MasterCard   | 5111 1111 1111 1118 | 100 |
| Visa         | 4012 0000 3333 0026 | 100 |
| AMEX         | 3714 4963 5398 431  | 1000 |
| JCB          | 3528 1111 0000 0001 | 100 |

---

## 🧾 3DSecure (Challenge Flow)

These cards trigger **3D Secure challenge flow** (e.g. OTP or biometric step).

| Scheme Brand | Card Number      | CVV  |
|--------------|------------------|------|
| MasterCard   | 5123 4500 0000 0008 | 100 |
| Visa         | 4508 7500 1574 1019 | 100 |
| AMEX         | 3400 0009 9900 051  | 1000 |
| JCB          | 3528 0000 0000 0007 | 100 |

---

## ✅ 3DSecure (Frictionless Flow)

These cards simulate **frictionless** 3DSecure transactions (no additional authentication required).

| Scheme Brand | Card Number      | CVV  |
|--------------|------------------|------|
| MasterCard   | 5123 4567 8901 2346 | 100 |
| Visa         | 4440 0000 4220 0014 | 100 |
| AMEX         | 3403 5327 8080 900  | 1000 |

---

## ⚠️ Trigger Specific Gateway Responses

Use the following **expiry dates** with any test card to simulate different transaction outcomes.

| Expiry Date | Simulated Gateway Response |
|-------------|----------------------------|
| 01 / 39     | APPROVED                   |
| 05 / 39     | DECLINED                   |
| 04 / 27     | EXPIRED_CARD               |
| 08 / 28     | TIMED_OUT                  |
| 01 / 37     | ACQUIRER_SYSTEM_ERROR      |
| 02 / 37     | UNSPECIFIED_FAILURE        |
| 05 / 37     | UNKNOWN                    |

---

*Note: CVV and Expiry are required to trigger responses. You may use any valid future date unless testing a specific scenario.*
