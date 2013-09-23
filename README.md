# PhoneCheckJS

Why?
----
The internet's got a lot of forms used to get data from users. Sometimes it's helpful to ensure that the data being submitted is legitimate.

[POP.co](http://pop.co), a product of [.CO](http://go.co), required a useful validation helper for mobile number entry since we were leveraging text messages to handle user validation.

PhoneCheckJS is the result of wanting to refactor and abstract away the main functionality that was initially implemented on [POP's](http://pop.co) homepage to collect user telephone numbers from multiple countries.

How?
----
To use PhoneCheckJS, you will need to have at least two elements in your markup:
* Country Field/List (&lt;input&gt; or &lt;select&gt;)
* Phone Number Field (&lt;input&gt;)

Note:
* The PhoneCheck and its underlying libphonenumber library (specified in Dependencies) rely on two-letter country codes to validate input.
* Users need to enter their number in its full international format.


After including the following depencies (inlcuded in the /js) and PhoneCheckJS:

```
<script type="text/javascript" src="js/libphonenumber.min.js"></script>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/phonecheck.js"></script>
```

All you need to do is call the PhoneCheck constructor, passing in two jQuery objects, the first representing the phone number field to validate and country code field: 

```
<script type="text/javascript">
	new PhoneCheck($('input'), $('select'));
</script>
```

Loading your webpage with this default code will insert the selected country's country code digit(s) in the number input field. Eg, for the US '+ 1 ' will be in the field. Selecting the United Kingdom (UK) will overwrite the current input to be '+ 44 '.

PhoneCheck validates the input as the user types a character.

* Valid input will result in a 'pc-valid'class being added to the input element.
* Invalid input will result in a 'pc-invalid' class being added to the input element.
* By default, with no input (ie, only the country code - if applicable), neither class will be present.

You may use either class ('pc-valid' or 'pc-invalid') to check the validity of the input in the element and/or style the field appropriately.

Disclaimer
----
PhoneCheckJS does not have 100% support for every country listed in the demo country selector. For countries that the libphonenumber library does not support, PhoneCheckJS will default to allowing any numeric entry as valid to reduce the occurrence of false negatives.

Dependencies
----
PhoneCheckJS has two depencies:
* [jQuery](http://jquery.com)
* [libphonenumber (by Google)](https://code.google.com/p/libphonenumber/)

Culprit (Creator)
----
This (hopefully) helpful package was put together by [@mrdazm](http://twitter.com/mrdazm) under MIT license.

Follow [@thePOPguys](http://twitter.com/thePOPguys) and [@dotco](http://twitter.com/dotco)!

&copy; 2013 Domain Marketing Ventures
