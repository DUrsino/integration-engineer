# PowerBoard Client SDK

This guide will provide you with instructions on how-to initialise &amp; customise your PowerBoard Widget integration.

# What is the Hosted Client SDK?

PowerBoard offers an extensively customisable client sdk that accepts all available payment methods, supports input validation, and built-in 3DS 2.0 capability.

- It is a solution for collecting and handling <<glossary:payment source>>s in a secure way. 
- With the client SDK you can create a payment form widget as an independent part or use it directly inside your payment form.
- The SDK supports a number of methods for customising the widget to your websites needs (styling, form fields, etc)

> 👍 Getting started with the Client SDK
> 
> To work with the widget you will need [public_key](/reference/getting-started-with-your-api#authentication) or access_token
> 
> Also you will need a [gateway id](/docs/services) from your connected services in PowerBoard.

***

## Environments

```html Pre-Production
<script src="https://widget.preproduction.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script> 
<script>
    var widget = new cba.HtmlWidget('#widget', 'PUBLIC_KEY', 'GATEWAY_ID');
    widget.setEnv("preproduction_cba");
    widget.load();
</script> 
<div id="widget"></div>
```
```html Production
<script src="https://widget.powerboard.commbank.com.au/sdk/latest/widget.umd.min.js"></script> 
<script>
    var widget = new cba.HtmlWidget('#widget', 'PUBLIC_KEY', 'GATEWAY_ID');
    widget.setEnv("production_cba");
    widget.load();
</script> 
<div id="widget"></div>
```

***

# Widget Customisation

> 📘 
> 
> Please note that the steps and code samples are generalised, so you may need to adjust them to fit your application.

<br />

***

# Widget Classes

## setFormFields

**Description**

Set list with widget form field, which will be shown in form. Also, you can set the required validation for these fields.

```javascript Code Sample
widget.setFormFields(['phone',
    'email',
    'first_name*',
    'last_name',
    'phone2',
    'address_line1',
    'address_line1',
    'address_line2',
    'address_state',
    'address_country',
    'address_city',
    'address_postcode',
    'address_company'
]);
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| card_name        | string |
| expire_month     | string |
| expire_year      | string |
| card_ccv         | string |
| first_name       | string |
| last_name        | string |
| email            | string |
| phone            | string |
| phone2           | string |
| address_line1    | string |
| address_line2    | string |
| address_state    | string |
| address_city     | string |
| address_postcode | string |
| address_company  | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/98ee814-Widget-Customisation-Preview.png",
        null,
        "Widget Preview"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setFormElements

**Description**

Allows merchants to set and configure Widget Form elements, including:

- visibility
- required
- label
- placeholder
- value

```javascript Code Sample
widget.setFormElements([
      {
          field:  'card_name*',
          placeholder: 'Input your card holder name...',
          label: 'Card Holder Name',
          value: 'Houston',
      },
      {
          field:  'email',
          placeholder: 'Input your email, like test@example.com',
          label: 'Email for the receipt',
          value: 'predefined@email.com',
      },
  ])
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| card_name        | string |
| expire_month     | string |
| expire_year      | string |
| card_ccv         | string |
| first_name       | string |
| last_name        | string |
| email            | string |
| phone            | string |
| phone2           | string |
| address_line1    | string |
| address_line2    | string |
| address_state    | string |
| address_city     | string |
| address_postcode | string |
| address_company  | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/35789c0-Widget_setFormElements.png",
        null,
        "Widget preview"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setStyles

**Description**

Allows to set and configure styling for the Widget

```javascript Code Sample
widget.setStyles({
      background_color: 'rgb(0, 0, 0)',
      border_color: 'yellow',
      text_color: '#FFFFAA',
      button_color: 'rgba(255, 255, 255, 0.9)',
      font_size: '20px',
      font_family: 'fantasy'
  });
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| background_color | string |
| text_color       | string |
| border_color     | string |
| button_color     | string |
| error_color      | string |
| success_color    | string |
| font_size        | string |
| font_family      | string |

***

## setTexts

**Description**

Method to set different texts within the widget.

- visibility
- required
- label
- placeholder
- value

```javascript Code Sample
widget.setTexts({
      title: 'Your card',
      finish_text: 'Payment resource was successfully accepted',
      title_description: '* indicates required field',
      submit_button: 'Save',
      submit_button_processing: 'Load...',
  });
```

**Configurable Parameter**

| Parameter                  | Type   |
| :------------------------- | :----- |
| [title]                    | string |
| [title_h1]                 | string |
| [title_h2]                 | string |
| [title_h3]                 | string |
| [title_h4]                 | string |
| [title_h5]                 | string |
| [title_h5]                 | string |
| [title_h6]                 | string |
| [finish_text]              | string |
| [title_description]        | string |
| [submit_button]            | string |
| [submit_button_processing] | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/4636370-MicrosoftTeams-image_3.png",
        null,
        "Widget"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setElementStyle

**Description**

Method for setting customisation of the PowerBoard Widget elements and relevant states.  

Element states are as follows:

- error
- focus
- hover

```javascript Code Sample
widget.setElementStyle('input', {
  border: 'green solid 1px'
});
 
widget.setElementStyle('input', 'focus', {
  border: 'blue solid 1px'
});
 
widget.setElementStyle('input', 'error', {
 border: 'red solid 1px'
});
 
widget.setElementStyle('input', 'hover', {
  border: 'blue solid 1px'
});
```

**Configurable Parameter**

| Parameter                  | Type   |
| :------------------------- | :----- |
| [title]                    | string |
| [title_h1]                 | string |
| [title_h2]                 | string |
| [title_h3]                 | string |
| [title_h4]                 | string |
| [title_h5]                 | string |
| [title_h5]                 | string |
| [title_h6]                 | string |
| [finish_text]              | string |
| [title_description]        | string |
| [submit_button]            | string |
| [submit_button_processing] | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dc4d33a-setElementStyle.png",
        null,
        "widget-setElementStyle"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setFormValues

**Description**

Method to set predefined values for the form fields inside the widget.

```javascript Code Sample
widget.setFormValues({
      email: 'predefined@email.com',
      card_name: 'Houston'
  });
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| card_name        | string |
| expire_month     | string |
| expire_year      | string |
| card_ccv         | string |
| first_name       | string |
| last_name        | string |
| email            | string |
| phone            | string |
| phone2           | string |
| address_line1    | string |
| address_line2    | string |
| address_state    | string |
| address_city     | string |
| address_postcode | string |
| address_company  | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3963b43-setFormValues.png",
        null,
        "widget-setFormValues"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setFormLables

**Description**

Method to set custom form field labels.

```javascript Code Sample
widget.setFormLabels({
      card_name: 'Card Holder Name ABC'
  })
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| card_name        | string |
| expire_month     | string |
| expire_year      | string |
| card_ccv         | string |
| first_name       | string |
| last_name        | string |
| email            | string |
| phone            | string |
| phone2           | string |
| address_line1    | string |
| address_line2    | string |
| address_state    | string |
| address_city     | string |
| address_postcode | string |
| address_company  | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b998d5d-MicrosoftTeams-image_1.png",
        null,
        "widget"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setFormPlaceholders

**Description**

Method to set custom form field labels.

```javascript Code Sample
widget.setFormPlaceholders({
      card_name: 'Input your card holder name...',
      email: 'Input your email, like test@example.com'
  })
```

**Configurable Parameters**

| Parameter        | Type   |
| :--------------- | :----- |
| card_name        | string |
| expire_month     | string |
| expire_year      | string |
| card_ccv         | string |
| first_name       | string |
| last_name        | string |
| email            | string |
| phone            | string |
| phone2           | string |
| address_line1    | string |
| address_line2    | string |
| address_state    | string |
| address_city     | string |
| address_postcode | string |
| address_company  | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c59fd13-MicrosoftTeams-image_2.png",
        null,
        "widget"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setHiddenElements

**Description**

Using this method, you can set hidden elements for the widget.

```javascript Code Sample
widget.setHiddenElements(['submit_button']);
```

**Configurable Parameters**

| Parameters    | Type   |
| :------------ | :----- |
| SUBMIT_BUTTON | string |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/664c5e7-widget-setHiddenElements.png",
        null,
        "widget-setHiddenElements"
      ],
      "align": "center"
    }
  ]
}
[/block]


***

## setRefId

**Description**

Method to set a custom reference when using the widget.

```javascript Code Sample
widget.setRefId('abc-1234567');
```

**Configurable Parameters**

| Parameters | Type   |
| :--------- | :----- |
| id         | string |

**Preview**

```json

{
    "event": "finish",
    "purpose": "payment_source",
    "message_source": "widget.paydock",
    "ref_id": "abc-1234567",
    "widget_id": "7ff7ff74-dedb-236d-0383-4d7afc8ad462",
    "payment_source": "27f2efcf-df0c-4d3e-b094-17d272c4ba97"
}
```

***

## setSupportedCardIcons

**Description**

Sets icons of supported card types.

```javascript Code Sample
widget.setSupportedCardIcons(['mastercard', 'visa', 'amex']);
```

**Configurable Parameters**

| Parameters | Type   | default      |
| :--------- | :----- | :----------- |
| AMEX       | string | "amex"       |
| JAPCB      | string | "japcb"      |
| MASTERCARD | string | "mastercard" |
| VISA       | string | "visa"       |

**Preview**

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3f81357-widget-setSupportedCardIcons.png",
        null,
        "setSupportedCardIcons"
      ],
      "align": "center"
    }
  ]
}
[/block]


## validateCardNumberInput

**Description**

Validation extension will only enforce the supported cards listed prior and everything else will get a not supported prompt

```javascript Code Example
widget.setSupportedCardIcons(['mastercard', 'visa'], validateCardNumberInput = true);
```

***

## setWebHookDestination

**Description**

Destination where customer will receive all successful responses. Response will contain “data” object with “payment_source” or other parameters, in depending on 'purpose'

```javascript Code Sample
widget.setWebHookDestination('http://google.com');
```

**Configurable Parameters**

| Parameters | Type   | Description                    |
| :--------- | :----- | :----------------------------- |
| url        | string | Your endpoint for POST request |

***

## setSuccessRedirectUrl

**Description**

URL to which the Customer will be redirected to after the success finish

```javascript Code Sample
widget.setSuccessRedirectUrl('google.com/search?q=success');
```

**Configurable Parameters**

| Parameters | Type   |
| :--------- | :----- |
| url        | string |

***

## setErrorRedirectUrl

**Description**

URL to which the Customer will be redirected to if an error is triggered in the process of operation

```javascript Code Sample
widget.setErrorRedirectUrl('google.com/search?q=error');
```

**Configurable Parameters**

| Parameters | Type   |
| :--------- | :----- |
| url        | string |

***

## setFormFields

**Description**

Set list with widget form field, which will be shown in form. Also you can set the required validation for these fields

```javascript Code Sample
widget.setFormFields(['phone', 'email', 'first_name*']);
```

**Configurable Parameters**

| Parameters | Type                 | Description                                                                                                                                                                                                                                               |
| :--------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fields     | [ 'Array' ].<string> | name of fields which can be shown in a widget. If after a name of a field, you put “\*”, this field will be required on client-side. (For validation, you can specify any fields, even those that are shown by default: card_number, expiration, etc... ) |

***

## load

**Description**

The final method to beginning, the load process of widget to html

***

## on

**Description**

htmlWidget.on(eventName, [cb]) ⇒ Promise.\<(IEventData|IEventMetaData|IEventFinishData|IFormValidation)> | void

Listen to events of widget.

```javascript Code Sample
widget.on('form_submit', function (data) {
     console.log(data);
});
// or
 widget.on('form_submit').then(function (data) {
     console.log(data);
});
```

**Configurable Parameters**

| Parameters | Type   | Description                                    |
| :--------- | :----- | :--------------------------------------------- |
| eventName  | string | Available events found here: [events](#events) |

***

## trigger

**Description**

This callback will be called for every specified trigger

**Configurable Parameters**

| Parameters | Type         | Description                           |
| :--------- | :----------- | :------------------------------------ |
| triggers   | triggerName  | submit_form, tab                      |
| data       | ITriggerData | Data which will be sent to the widget |

***

## getValidationState

**Description**

This method will check the validation state of the form

Returns **IFormValidation** response

```javascript Code Sample
widget.getValidationState();
```

***

## isValidForm

**Description**

This method will check if the form is valid

Returns **Boolean** - Form is valid

```javascript Code Sample
widget.isValidForm();
```

***

## isInvalidForm

**Description**

Using this method you can check if a specific form field is invalid

Returns **Boolean** - Field is invalid

```javascript Code Sample
widget.isInvalidField(field);
```

**Configurable Parameters**

| Parameters | Type   | Description |
| :--------- | :----- | :---------- |
| field      | string | field name  |

***

## isInvalidFieldByValidator

**Description**

Using this method you can check if a specific field is invalid

Returns **Boolean** - Field is invalid 

```javascript Code Sample
widget.isInvalidFieldByValidator(field, validator);
```

**Configurable Parameters**

| Parameters | Type   | Description                                                                             |
| :--------- | :----- | :-------------------------------------------------------------------------------------- |
| field      | string | field name                                                                              |
| validator  | string | Validator name: Available values: _required, cardNumberValidator, expireDateValidation_ |

***

## hide

**Description**

Using this method you can hide the widget after load

```javascript Code Sample
widget.hide([saveSize = False]);
```

**Configurable Parameters**

| Parameters | Type    | Description                                                      |
| :--------- | :------ | :--------------------------------------------------------------- |
| saveSize   | Boolean | Using this param you can save the iFrame's size. Default = false |

***

## show

**Description**

This method will show the widget after using hide

```javascript Code Sample
widget.show()
```

***

## reload

**Description**

This method will reload the widget

```javascript Code Sample
widget.reload()
```

***

## hideElements

**Description**

Use this method to hide any elements inside the widget

```javascript Code Sample
widget.hideElements(['submit_button', 'email']);
```

**Configurable Parameters**

| Parameters | Type  | Description                           |
| :--------- | :---- | :------------------------------------ |
| elements   | array | List of elements which will be hidden |

***

## interceptSubmitForm

**Description**

Widget will intercept submit of your form for processing widget

Process: click by submit button in your form --> submit widget ---> submit your form

Kind: instance method of HtmlWidget  
**Note**: submit button in widget will be hidden.

```html Code Sample
<form id="myForm">
     <button type="submit">Submit</button>
 </form>
<!--
-->
<script>
    widget.interceptSubmitForm('#myForm');
</script>
```

***

## showElements

**Description**

Use this method to show elements inside the widget

```javascript Code Sample
widget.showElements(['submit_button', 'email']);
```

**Configurable Parameters**

| Parameters | Type  | Description                          |
| :--------- | :---- | :----------------------------------- |
| elements   | array | List of elements which will be shown |

***

## updateFormValues

**Description**

Method for updating values of the form fields within the widget

```javascript Code Sample
widget.updateFormValues({
      email: 'predefined@email.com',
      card_name: 'Houston'
  });
```

**Configurable Parameters**

| Parameters  | Type        | Description                             |
| :---------- | :---------- | :-------------------------------------- |
| fieldValues | IFormValues | List of fields and values to be updated |

***

## onFinishInsert

**Description**

After the finish event of the widget, data (dataType) will be inserted into the input (selector)

```javascript Code Sample
widget.onFinishInsert(selector, dataType);
```

**Configurable Parameters**

| Parameters | Type   | Description                    |
| :--------- | :----- | :----------------------------- |
| selector   | string | css selector                   |
| dataType   | string | data type of IEventData Object |

***

## useAutoResize

**Description**

Use this method to resize the iFrame according to content height

```javascript Code Sample
widget.useAutoResize();
```

***

## usePhoneCountryMask

**Description**

Method to set a country code mask for the phone input

```javascript Code Sample
widget.usePhoneCountryMask([options]);
```

**Configurable Parameters**

| Parameters                  | Type   | Description                                                   |
| :-------------------------- | :----- | :------------------------------------------------------------ |
| options                     | Object | Object defining the configurable options for the phone mask   |
| option.default_country      | string | Set a default country for the mask                            |
| options.preferred_countries | array  | Set list of preferred countries for the top of the select box |
| options.only_countries      | array  | Set list of countries to show in the select box.              |

***

# Events

List of available event names

| Event name       | type   | default           | Response                                  |
| :--------------- | :----- | :---------------- | :---------------------------------------- |
| AFTER_LOAD       | string | "afterLoad"       | Returns **IEventData** event object       |
| SUBMIT           | string | "submit"          | Returns **IEventData** event object       |
| FINISH           | string | "finish"          | Returns **IEventFinishData** event object |
| VALIDATION       | string | "validation"      | Returns **IFormValidation** event object  |
| VALIDATION_ERROR | string | "validationError" | Returns **IFormValidation** event object  |
| SYSTEM_ERROR     | string | "systemError"     | Returns **IEventData** event object       |
| META_CHANGE      | string | "metaChange"      | Returns **IEventMetaData** event object   |
| RESIZE           | string | "resize"          | Returns **IEventData** event object       |

***

# Interfaces

## IEventData

| Parameter      | Type   | Description                                                        |
| :------------- | :----- | :----------------------------------------------------------------- |
| event          | string | Event name                                                         |
| purpose        | string | system variable. Purpose of the event                              |
| message_source | string | system variable. Event source                                      |
| ref_id         | string | custom value for identifying the result of the processed operation |

## IEventMetaData

| Parameter           | Type   | Description                                                         |
| :------------------ | :----- | :------------------------------------------------------------------ |
| event               | string | Event name                                                          |
| purpose             | string | system variable. Purpose of the event                               |
| message_source      | string | system variable. Event source                                       |
| ref_id              | string | custom value for indentifying the result of the processed operation |
| configuration_token | string | Token received from our API with widget data                        |
| type                | string | Payment type, 'card' or 'bank account'                              |
| gateway_type        | string | Gateway type                                                        |
| card_number_last4   | string | Last 4 digits of the card                                           |
| card_scheme         | string | Card Scheme                                                         |
| card_number_length  | string | Card number length                                                  |

## IEventFinishData

| Parameter      | Type   | Description                                                        |
| :------------- | :----- | :----------------------------------------------------------------- |
| event          | string | Event name                                                         |
| purpose        | string | system variable. Purpose of the event                              |
| message_source | string | system variable. Event source                                      |
| ref_id         | string | custom value for identifying the result of the processed operation |
| payment_source | string | One time token returned from PowerBoard                            |

## IFormValidation

| Parameter             | Type    | Description                                                        |
| :-------------------- | :------ | :----------------------------------------------------------------- |
| event                 | string  | Event name                                                         |
| purpose               | string  | system variable. Purpose of the event                              |
| message_source        | string  | system variable. Event source                                      |
| ref_id                | string  | custom value for identifying the result of the processed operation |
| form_valid            | boolean | Boolean identifying if the form is valid                           |
| invalid_fields        | array   | invalid form fields                                                |
| invalid_showed_fields | array   | list of fields on which the error is already displayed             |
| validators            | array   | list of validators with fields                                     |

***

# Appendix A - Advanced Widget Customisation

Elements which can accept custom styling are as follows: 

- input
- submit_button
- label
- title
- title_description

Please refer to <https://developer.mozilla.org/en-US/docs/Web/CSS> for further information on CSS properties. 

### Input Example

```javascript
  widget.setElementStyle('input', {
        border: 'red solid 10px',
        border_radius: '30px'
    });
```

<br />

| Parameter          | Type   |
| :----------------- | :----- |
| [color]            | string |
| [border]           | string |
| [border_radius]    | string |
| [background_color] | string |
| [height]           | string |
| [text_decoration]  | string |
| [font_size]        | string |
| [font_family]      | string |
| [transition]       | string |
| [line_height]      | string |
| [font_weight]      | string |
| [padding]          | string |
| [margin]           | string |

### Submit Button Example

```javascript
 widget.setElementStyle('submit_button', {
        border: 'green solid 10px',
        border_radius: '30px'
    });
```

| Parameter          | Type   |
| :----------------- | :----- |
| [color]            | string |
| [border]           | string |
| [border_radius]    | string |
| [background_color] | string |
| [text_decoration]  | string |
| [font_size]        | string |
| [font_family]      | string |
| [padding]          | string |
| [margin]           | string |
| [transition]       | string |
| [line_height]      | string |
| [font_weight]      | string |
| [opacity]          | string |

### Label Example

```javascript
 widget.setElementStyle('label', {
        color: 'rebeccapurple'
    });
```

| Parameter         | Type   |
| :---------------- | :----- |
| [color]           | string |
| [text_decoration] | string |
| [font_size]       | string |
| [font_family]     | string |
| [line_height]     | string |
| [font_weight]     | string |
| [padding]         | string |
| [margin]          | string |

### Title Example

```javascript
 widget.setElementStyle('title', {
        text_decoration: 'underline'
    });
```

| Parameter         | Type   |
| :---------------- | :----- |
| [color]           | string |
| [text_decoration] | string |
| [font_size]       | string |
| [font_family]     | string |
| [line_height]     | string |
| [font_weight]     | string |
| [padding]         | string |
| [margin]          | string |
| [text-align]      | string |

### Title Description Example

```javascript
 widget.setElementStyle('title_description', {
        font_size: '42px'
    });
```

| Parameter         | Type   |
| :---------------- | :----- |
| [color]           | string |
| [text_decoration] | string |
| [font_size]       | string |
| [font_family]     | string |
| [line_height]     | string |
| [font_weight]     | string |
| [padding]         | string |
| [margin]          | string |
| [text-align]      | string |

***

# Appendix B - Manual Submission Trigger

If you wish to manually submit the credit card form and not use the pre-rendered 'submit' button, please use the following: 

```javascript Code Sample
widget.setHiddenElements(['submit_button']); // Hides Pre-Rendered Submit Button

widget.trigger('submit_form'); // Manually triggers form submission and generates One-Time-Token
```